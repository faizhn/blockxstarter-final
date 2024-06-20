// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Crowdfunding {
    address public owner;
    uint public projectTax;
    uint public projectCount;
    uint public balance;
    statsStruct public stats;
    projectStruct[] public projects;

    mapping(address => projectStruct[]) projectsOf;
    mapping(uint => backerStruct[]) backersOf;
    mapping(uint => commentStruct[]) commentsOf;
    mapping(uint => bool) public projectExist;
    mapping(string => uint[]) categoryProjects;

    enum statusEnum {
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        PAIDOUT
    }

    struct statsStruct {
        uint totalProjects;
        uint totalBacking;
        uint totalDonations;
    }

    struct backerStruct {
        address owner;
        uint contribution;
        uint timestamp;
        bool refunded;
    }

    struct commentStruct {
        address commenter;
        string comment;
        uint timestamp;
    }

    struct projectStruct {
        uint id;
        address owner;
        string title;
        string description;
        string imageURL;
        string category;
        uint cost;
        uint raised;
        uint timestamp;
        uint expiresAt;
        uint backers;
        statusEnum status;
    }

    modifier ownerOnly() {
        require(msg.sender == owner, "Hanya untuk pemilik");
        _;
    }

    event Action (
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    constructor(uint _projectTax) {
        owner = msg.sender;
        projectTax = _projectTax;
    }

    function createProject(
        string memory title,
        string memory description,
        string memory imageURL,
        string memory category,
        uint cost,
        uint expiresAt
    ) public returns (bool) {
        require(bytes(title).length > 0, "Judul tidak boleh kosong");
        require(bytes(description).length > 0, "Deskripsi tidak boleh kosong");
        require(bytes(imageURL).length > 0, "GambarURL tidak boleh kosong");
        require(bytes(category).length > 0, "Kategori tidak boleh kosong");
        require(cost > 0 ether, "Biaya tidak boleh nol");

        projectStruct memory project;
        project.id = projectCount;
        project.owner = msg.sender;
        project.title = title;
        project.description = description;
        project.imageURL = imageURL;
        project.category = category;
        project.cost = cost;
        project.timestamp = block.timestamp;
        project.expiresAt = expiresAt;

        projects.push(project);
        projectExist[projectCount] = true;
        projectsOf[msg.sender].push(project);
        stats.totalProjects += 1;
        categoryProjects[category].push(projectCount);

        emit Action (
            projectCount++,
            "PROJECT DIBUAT",
            msg.sender,
            block.timestamp
        );
        return true;
    }

    function updateProject(
        uint id,
        string memory title,
        string memory description,
        string memory imageURL,
        uint expiresAt
    ) public returns (bool) {
        require(msg.sender == projects[id].owner, "Entitas yang Tidak Berwenang");
        require(bytes(title).length > 0, "Judul tidak boleh kosong");
        require(bytes(description).length > 0, "Deskripsi tidak boleh kosong");
        require(bytes(imageURL).length > 0, "GambarURL tidak boleh kosong");

        projects[id].title = title;
        projects[id].description = description;
        projects[id].imageURL = imageURL;
        projects[id].expiresAt = expiresAt;

        checkAndRefund(id);  // Memeriksa dan mengembalikan dana jika perlu

        emit Action (
            id,
            "PROJECT UPDATE",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function deleteProject(uint id) public returns (bool) {
        require(projects[id].status == statusEnum.OPEN, "Project tidak lagi dibuka");
        require(msg.sender == projects[id].owner, "Entitas yang Tidak Berwenang");

        projects[id].status = statusEnum.DELETED;
        performRefund(id);

        emit Action (
            id,
            "PROJECT DIHAPUS",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function performRefund(uint id) internal {
        for(uint i = 0; i < backersOf[id].length; i++) {
            address _owner = backersOf[id][i].owner;
            uint _contribution = backersOf[id][i].contribution;
            
            backersOf[id][i].refunded = true;
            backersOf[id][i].timestamp = block.timestamp;
            payTo(_owner, _contribution);

            stats.totalBacking -= 1;
            stats.totalDonations -= _contribution;
        }
    }

    function backProject(uint id) public payable returns (bool) {
        require(msg.value > 0 ether, "Ether harus lebih besar dari nol");
        require(projectExist[id], "Project tidak ditemukan");
        require(projects[id].status == statusEnum.OPEN, "Project tidak lagi dibuka");

        stats.totalBacking += 1;
        stats.totalDonations += msg.value;
        projects[id].raised += msg.value;
        projects[id].backers += 1;

        backersOf[id].push(
            backerStruct(
                msg.sender,
                msg.value,
                block.timestamp,
                false
            )
        );

        emit Action (
            id,
            "DUKUNGAN PROJECT",
            msg.sender,
            block.timestamp
        );

        checkAndRefund(id);  // Memeriksa dan mengembalikan dana jika perlu

        if(projects[id].raised >= projects[id].cost) {
            projects[id].status = statusEnum.APPROVED;
            balance += projects[id].raised;
            performPayout(id);
            return true;
        }

        return true;
    }

    function checkAndRefund(uint id) internal {
        if(block.timestamp >= projects[id].expiresAt && projects[id].raised < projects[id].cost) {
            projects[id].status = statusEnum.REVERTED;
            performRefund(id);
        }
    }

    function performPayout(uint id) internal {
        uint raised = projects[id].raised;
        uint tax = (raised * projectTax) / 100;

        projects[id].status = statusEnum.PAIDOUT;

        payTo(projects[id].owner, (raised - tax));
        payTo(owner, tax);

        balance -= projects[id].raised;

        emit Action (
            id,
            "PROJECT DIBAYARKAN",
            msg.sender,
            block.timestamp
        );
    }

    function requestRefund(uint id) public returns (bool) {
        require(
            projects[id].status != statusEnum.REVERTED ||
            projects[id].status != statusEnum.DELETED,
            "Project tidak ditandai sebagai kembalikan atau hapus"
        );
        
        projects[id].status = statusEnum.REVERTED;
        performRefund(id);
        return true;
    }

    function payOutProject(uint id) public returns (bool) {
        require(projects[id].status == statusEnum.APPROVED, "Project tidak DISETUJUI");
        require(
            msg.sender == projects[id].owner ||
            msg.sender == owner,
            "Entitas yang Tidak Berwenang"
        );

        performPayout(id);
        return true;
    }

    function changeTax(uint _taxPct) public ownerOnly {
        projectTax = _taxPct;
    }

    function getProject(uint id) public view returns (projectStruct memory) {
        require(projectExist[id], "Project tidak ditemukan");

        return projects[id];
    }

    function getProjects() public view returns (projectStruct[] memory) {
        return projects;
    }

    function getProjectsByCategory(string memory category) public view returns (projectStruct[] memory) {
        projectStruct[] memory categoryProjectsList = new projectStruct[](categoryProjects[category].length);
        uint[] memory projectIds = categoryProjects[category];
        for (uint i = 0; i < projectIds.length; i++) {
            categoryProjectsList[i] = projects[projectIds[i]];
        }
        return categoryProjectsList;
    }

    function getBackers(uint id) public view returns (backerStruct[] memory) {
        return backersOf[id];
    }

    function getComments(uint id) public view returns (commentStruct[] memory) {
        return commentsOf[id];
    }

    function addComment(uint id, string memory comment) public returns (bool) {
        require(projectExist[id], "Project tidak ditemukan");
        require(
            hasBackedProject(id, msg.sender) ||
            projects[id].owner == msg.sender,
            "Hanya pendukung atau pemilik yang dapat berkomentar"
        );

        commentsOf[id].push(commentStruct({
            commenter: msg.sender,
            comment: comment,
            timestamp: block.timestamp
        }));

        emit Action (
            id,
            "PROJECT COMMENT",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function hasBackedProject(uint id, address addr) internal view returns (bool) {
        for (uint i = 0; i < backersOf[id].length; i++) {
            if (backersOf[id][i].owner == addr) {
                return true;
            }
        }
        return false;
    }

    function payTo(address to, uint amount) internal {
        (bool success,) = payable(to).call{value: amount}("");
        require(success, "Transaksi gagal");
    }
}
