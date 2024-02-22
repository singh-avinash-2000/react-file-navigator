import React from 'react';
import { VscCollapseAll, VscNewFile, VscFolderOpened } from 'react-icons/vsc';
import { File, Folder, ExplorerProps } from '../util/types';
import { addNewNode, collapseAllNodes, deleteNodeById, findNodeById, generateRandomIntID } from '../util/methods';
import FileTree from './FileTree';
import { useExplorerContext } from '../context/useExplorerContext';

const Explorer: React.FC<ExplorerProps> = ({
	tree,
	setTree,
	config = { label: 'File Tree', rename: 'Both', delete: 'Both', fontColor: 'black' },
	iconMap,
}) => {
	const { currentlySelectedNode, setCurrentlySelectedNode, setIsRenameSelected, setRenameNodeId } = useExplorerContext();

	const createNewNode = (type: 'File' | 'Folder') => {
		var newNode: Folder | File;
		if (type === 'Folder') {
			newNode = {
				id: generateRandomIntID(),
				type: 'Folder',
				name: '',
				filePath: '',
				expanded: false,
				children: [],
				icon: 'folderCollapsed',
				new: true,
			} as Folder;
		} else {
			newNode = {
				id: generateRandomIntID(),
				type: 'File',
				filePath: '',
				extension: '',
				icon: 'default',
				name: '',
				new: true,
			} as File;
		}

		setCurrentlySelectedNode(newNode);
		setIsRenameSelected(true);
		setRenameNodeId(newNode.id);
		addNewNode(tree, currentlySelectedNode, newNode);
		setTree([...tree]);
	};

	const collapseAll = () => {
		const updatedNodes = collapseAllNodes(tree);
		setTree([...updatedNodes]);
	};

	const updateNodeDetails = (newNodeData: File | Folder) => {
		let nodeDetails = findNodeById(tree, currentlySelectedNode?.id!);
		nodeDetails = { ...newNodeData };
		setTree([...tree]);
	};

	const deleteNode = (nodeId: string) => {
		deleteNodeById(tree, nodeId);
		setTree([...tree]);
	};

	return (
		<div style={{ color: config.fontColor }}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<span style={{ marginBlock: 5, padding: 0, marginInline: 15 }}>{config.label}</span>
				<div
					style={{
						width: '30%',
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'space-evenly',
					}}>
					<VscFolderOpened style={{ height: '20px', width: '20px', cursor: 'pointer' }} onClick={() => createNewNode('Folder')} />
					<VscNewFile
						style={{ height: '20px', width: '20px', cursor: 'pointer' }}
						onClick={() => {
							createNewNode('File');
						}}
					/>
					<VscCollapseAll style={{ height: '20px', width: '20px', cursor: 'pointer' }} onClick={() => collapseAll()} />
				</div>
			</div>
			<FileTree tree={tree} updateNodeDetails={updateNodeDetails} deleteNode={deleteNode} config={config} iconMap={iconMap} />
		</div>
	);
};

export default Explorer;
