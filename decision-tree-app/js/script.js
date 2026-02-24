// 1. Define the Tree Data
const treeData = {
    label: "Is it raining?",
    children: [
        {
            label: "Yes",
            children: [
                { label: "Bring Umbrella", isLeaf: true }
            ]
        },
        {
            label: "No",
            children: [
                {
                    label: "Is it sunny?",
                    children: [
                        { label: "Wear Sunscreen", isLeaf: true },
                        { label: "Go for a walk", isLeaf: true }
                    ]
                }
            ]
        }
    ]
};

// 2. The Recursive Function to build HTML
function createTreeHTML(node) {
    // Create the list item for this node
    const li = document.createElement('li');
    
    // Create the visual "box" for the node
    const div = document.createElement('div');
    div.textContent = node.label;
    if (node.isLeaf) div.classList.add('is-leaf');
    li.appendChild(div);

    // If this node has children, create a new <ul> and recurse
    if (node.children && node.children.length > 0) {
        const ul = document.createElement('ul');
        node.children.forEach(child => {
            ul.appendChild(createTreeHTML(child));
        });
        li.appendChild(ul);
    }

    return li;
}

// 3. Render it to the screen
const container = document.getElementById('tree-container');
const rootUl = document.createElement('ul');
rootUl.appendChild(createTreeHTML(treeData));
container.appendChild(rootUl);