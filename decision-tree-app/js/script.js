// 1. Define the Tree Data
const treeData = {
    label: "Do you have your 501(c)(3) status?",
    children: [
        {
            label: "Yes",
            children: [
                { 
                    label: "NPro: Focus on Mission & Scaling", 
                    isLeaf: true,
                    url: "https://www.nproconsulting.com/contact" 
                }
            ]
        },
        {
            label: "No",
            children: [
                {
                    label: "Do you want to apply for 501(c)(3)?",
                    children: [
                        { 
                            label: "No: Consider Fiscal Sponsorship", 
                            isLeaf: true,
                            url: "https://www.councilofnonprofits.org/fiscal-sponsorship"
                        },
                        {
                            label: "Yes: Check Form Eligibility",
                            children: [
                                {
                                    label: "Projected annual gross receipts < $50k?",
                                    children: [
                                        { 
                                            label: "Use Form 1023-EZ (Short Form)", 
                                            isLeaf: true,
                                            url: "https://www.irs.gov/forms-pubs/about-form-1023-ez"
                                        },
                                        { 
                                            label: "Use Form 1023 (Long Form)", 
                                            isLeaf: true,
                                            url: "https://www.irs.gov/forms-pubs/about-form-1023"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

function createTreeHTML(node) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    
    if (node.isLeaf && node.url) {
        const link = document.createElement('a');
        link.href = node.url;
        link.target = "_blank";
        link.textContent = node.label;
        link.classList.add('leaf-link');
        div.appendChild(link);
        div.classList.add('is-leaf');
    } else {
        div.textContent = node.label;
    }

    li.appendChild(div);

    if (node.children && node.children.length > 0) {
        const ul = document.createElement('ul');
        node.children.forEach(child => {
            ul.appendChild(createTreeHTML(child));
        });
        li.appendChild(ul);
    }
    return li;
}

function renderTree() {
    const container = document.getElementById('tree-container');
    container.innerHTML = ''; // Clear the current tree
    const rootUl = document.createElement('ul');
    rootUl.appendChild(createTreeHTML(treeData));
    container.appendChild(rootUl);
}

// Event Listener for the Restart Button
document.getElementById('restart-btn').addEventListener('click', renderTree);

// Initial Render on page load
renderTree();