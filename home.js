// ------------all Elements Select ----------------
const issueContainer = document.getElementById('issue-container');
const issueCount = document.getElementById('issue-count');
const searchInput = document.getElementById('searchInput');
const allBtn = document.getElementById('allBtn');
const openBtn = document.getElementById('openBtn');
const closedBtn = document.getElementById('closedBtn');

let allIssuesData = [];

//-------------- Fetch Issues-------------
const fetchIssues = async (query = '') => {
    issueContainer.innerHTML = `
    <div class="col-span-full flex justify-center py-20">
        <span class="loading loading-spinner loading-lg text-[#7C3AED]"></span>
    </div>
    `;

    let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    if (query) {
        url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`;
    }

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("API Failed");
        const data = await res.json();
        allIssuesData = Array.isArray(data.data) ? data.data : [];
        displayIssues(allIssuesData);
    } catch (error) {
        console.log(error);
        issueContainer.innerHTML = `<p class="text-red-500 text-center col-span-full font-bold">Something went wrong!</p>`;
        issueCount.innerText = "0";
    }
};

// --------------- Display Issues --------------
const displayIssues = (issues) => {
    issueContainer.innerHTML = "";
    issueCount.innerText = issues.length;

    if (issues.length === 0) {
        issueContainer.innerHTML = `<p class="text-gray-500 text-center col-span-full py-10">No issues found</p>`;
        return;
    }

    issues.forEach(issue => {
        const status = issue.status?.toLowerCase();
        const priority = issue.priority?.toLowerCase() || "low";
        const label = issue.label?.toLowerCase() || "";

        const isOpen = status === "open";
        const borderColor = isOpen ? "border-[#22C55E]" : "border-[#A855F7]";
        
        const statusIcon = isOpen 
            ? '<i class="fa-brands fa-first-order-alt text-[#22C55E] text-lg"></i>' 
            : '<i class="fa-regular fa-circle-check text-[#A855F7] text-lg"></i>';

        let priorityClass = "bg-gray-100 text-gray-400";
        if (priority === "high") priorityClass = "bg-[#FFE4E6] text-[#FB7185]";
        if (priority === "medium") priorityClass = "bg-[#FEF3C7] text-[#FBBF24]";
        if (priority === "low") priorityClass = "bg-[#F3F4F6] text-[#9CA3AF]";

        let labelClass = "bg-[#FEF3C7] text-[#FBBF24] border-[#FEF3C7]";
        let labelIcon = '<i class="fa-solid fa-bug text-[10px]"></i>';

        if (label.includes("bug")) {
            labelClass = "bg-[#FFE4E6] text-[#FB7185] border-[#FFE4E6]";
            labelIcon = '<i class="fa-solid fa-virus text-[10px]"></i>';
        } else if (label.includes("enhancement")) {
            labelClass = "bg-[#DCFCE7] text-[#22C55E] border-[#DCFCE7]";
            labelIcon = '<i class="fa-solid fa-wand-magic-sparkles text-[10px]"></i>';
        }

        const card = document.createElement("div");
        card.className = `bg-white p-6 rounded-2xl shadow-sm border-t-[6px] ${borderColor} flex flex-col justify-between hover:shadow-md transition-all cursor-pointer`;
        
        card.onclick = () => showIssueModal(issue);

        card.innerHTML = `
            <div>
                <div class="flex justify-between items-center mb-4">
                    ${statusIcon}
                    <span class="px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-tighter ${priorityClass}">
                        ${issue.priority || "LOW"}
                    </span>
                </div>
                <h3 class="font-bold text-[#1F2937] text-lg mb-2 leading-tight">${issue.title}</h3>
                <p class="text-[#6B7280] text-sm mb-5 leading-relaxed line-clamp-2">${issue.description}</p>
            </div>
            <div>
                <div class="flex flex-wrap gap-2 mb-6">
                    <span class="px-3 py-1 border rounded-xl flex items-center gap-1.5 text-[10px] font-bold uppercase ${labelClass}">
                        ${labelIcon} ${issue.label || "BUG"}
                    </span>
                    <span class="px-3 py-1 bg-[#FEF3C7] text-yellow-600 border border-[#FEF3C7] rounded-xl flex items-center gap-1.5 text-[10px] font-bold uppercase">
                        <i class="fa-solid fa-life-ring text-[10px]"></i> HELP WANTED
                    </span>
                </div>
                <div class="text-[12px] text-gray-400 font-medium">
                    <p class="mb-1">#1 by <span class="text-gray-600 font-bold">${issue.author}</span></p>
                    <p>${issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : "3/8/2026"}</p>
                </div>
            </div>
        `;
        issueContainer.appendChild(card);
    });
};

// ---------------- Modal logic---------
const showIssueModal = (issue) => {
    const modal = document.getElementById('issue_details_modal'); 
    if(!modal) return;

    const statusText = issue.status?.toLowerCase() === 'open' ? 'Opened' : 'Closed';
    const statusBg = issue.status?.toLowerCase() === 'open' ? 'bg-[#22C55E]' : 'bg-[#A855F7]';
    
    //---------name and date------------
    const myName = "Imran Al Farabi";
    const myDate = "3/8/2026";

    //------------ title--------------
    document.getElementById('modal-title').innerText = issue.title;
    document.getElementById('modal-status').innerText = statusText;
    document.getElementById('modal-status').className = `px-3 py-1 ${statusBg} text-white rounded-md text-xs font-bold`;
    
    //------------- name and date----------
    document.getElementById('modal-author-info').innerHTML = `
        Opened by <span class="text-gray-800 font-bold">${myName}</span> • ${myDate}
    `;

    // --------lebel section---------
    const label = issue.label?.toLowerCase() || "";
    let labelHTML = '';

    if (label.includes("bug")) {
        labelHTML = `
            <span class="px-3 py-1 bg-[#FFE4E6] text-[#FB7185] rounded-xl text-[10px] font-bold uppercase border border-[#FFE4E6] flex items-center gap-1">
                <i class="fa-solid fa-virus"></i> BUG
            </span>
        `;
    } else if (label.includes("enhancement")) {
        labelHTML = `
            <span class="px-3 py-1 bg-[#DCFCE7] text-[#22C55E] rounded-xl text-[10px] font-bold uppercase border border-[#DCFCE7] flex items-center gap-1">
                <i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT
            </span>
        `;
    }

    //---------------- Help Wanted---------------
    labelHTML += `
        <span class="px-3 py-1 bg-[#FEF3C7] text-[#FBBF24] rounded-xl text-[10px] font-bold uppercase border border-[#FEF3C7] flex items-center gap-1">
            <i class="fa-solid fa-life-ring"></i> HELP WANTED
        </span>
    `;

    // --------modal-labels-container----------
    const labelsContainer = document.getElementById('modal-labels-container');
    if(labelsContainer) labelsContainer.innerHTML = labelHTML;

    // -----------------description----------------
    document.getElementById('modal-description').innerText = issue.description;
    document.getElementById('modal-assignee').innerText = myName; 
    document.getElementById('modal-priority').innerText = issue.priority || 'HIGH';
    
    modal.showModal(); 
};

// ---------- Tab Filter Active styles ----------
const setActiveTab = (btn) => {
    [allBtn, openBtn, closedBtn].forEach(b => b.classList.remove('bg-[#7C3AED]', 'text-white'));
    btn.classList.add('bg-[#7C3AED]', 'text-white');
};

allBtn.addEventListener("click", () => {
    setActiveTab(allBtn);
    displayIssues(allIssuesData);
});

openBtn.addEventListener("click", () => {
    setActiveTab(openBtn);
    displayIssues(allIssuesData.filter(i => i.status?.toLowerCase() === "open"));
});

closedBtn.addEventListener("click", () => {
    setActiveTab(closedBtn);
    displayIssues(allIssuesData.filter(i => i.status?.toLowerCase() === "closed"));
});

// -------------- Search -----------
let timer;
searchInput.addEventListener("input", (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        fetchIssues(e.target.value);
    }, 400);
});

// -----------Initial Load -------------
fetchIssues();