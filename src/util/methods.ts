import { Tree, File, Folder } from './types';

export const findNodeById = (nodes: Tree, id: string): File | Folder | null => {
	for (const node of nodes) {
		if (node.id === id) {
			return node;
		}

		if (node.type === 'Folder' && node.children) {
			const foundNode = findNodeById(node.children, id);
			if (foundNode) {
				return foundNode;
			}
		}
	}
	return null;
};

const findParentNodeById = (fileTree: Tree, fileId: string, parent: Folder | null = null): Folder | null => {
	for (const node of fileTree) {
		if (node.id === fileId) {
			return parent;
		}

		if (node.type === 'Folder' && node.children && node.children.length > 0) {
			const result = findParentNodeById(node.children, fileId, node);
			if (result) {
				return result;
			}
		}
	}
	return null;
};

export const collapseAllNodes = (tree: Tree): Tree => {
	return tree.map((item: File | Folder): File | Folder => {
		if (item.type === 'Folder') {
			return {
				...item,
				expanded: false,
				icon: 'folderCollapsed',
				children: collapseAllNodes(item.children), // Recursively collapse children
			};
		}
		return item;
	});
};

export const addNewNode = (nodes: Tree, currentlySelected: File | Folder | null, newEntry: File | Folder): void => {
	if (!currentlySelected) {
		newEntry.filePath = './' + newEntry.name;
		nodes.push(newEntry);
		return;
	}

	// when selected node is file we add the new node to the parent folder and when its a folder we add to that selected node
	const parentFolder =
		currentlySelected.type === 'File' ? findParentNodeById(nodes, currentlySelected.id) : (findNodeById(nodes, currentlySelected.id) as Folder);

	if (parentFolder) {
		newEntry.filePath = parentFolder.filePath + '/' + newEntry.name;
		parentFolder.expanded = true;
		parentFolder.icon = 'folderExpanded';
		parentFolder.children.push(newEntry);
		return;
	} else {
		newEntry.filePath = './' + newEntry.name;
		nodes.push(newEntry);
		return;
	}
};

export const deleteNodeById = (files: Tree, fileId: string) => {
	for (let i = 0; i < files.length; i++) {
		const node = files[i];

		if (node.id === fileId) {
			files.splice(i, 1);
			return true;
		}

		if (node.type === 'Folder' && node.children && node.children.length > 0) {
			const nodeDeleted = deleteNodeById(node.children, fileId);
			if (nodeDeleted) {
				return true;
			}
		}
	}

	return false;
};

export const generateRandomIntID = () => {
	return `${Math.ceil(Math.random() * 9999999999999999)}`;
};
