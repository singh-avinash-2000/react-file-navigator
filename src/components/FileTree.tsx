import React, { useEffect, useRef } from 'react';
import IconMapComponent from './IconMap';
import { useExplorerContext } from '../context/useExplorerContext';
import { Folder, Tree, File, ExplorerConfig, IconMap } from '../util/types';

interface FileTreeProps {
	tree: Tree;
	updateNodeDetails: (newNodeData: File | Folder) => void;
	deleteNode: (idx: string) => void;
	config: ExplorerConfig;
	iconMap: IconMap;
}

const FileTree: React.FC<FileTreeProps> = ({ tree, updateNodeDetails, deleteNode, config, iconMap }) => {
	const { setCurrentlySelectedNode, renameNodeId, isRenameSelected, currentlySelectedNode, setRenameNodeId, setIsRenameSelected } =
		useExplorerContext();

	const renameInputRef = useRef<HTMLInputElement | null>(null);

	const handleSingleClick = (node: File | Folder, idx: number) => {
		if (renameNodeId === node.id) return;
		setCurrentlySelectedNode(node);
		if (node.type === 'File') return;

		const currentNode = tree[idx] as Folder;
		currentNode.expanded = !node.expanded;
		currentNode.icon = node.expanded ? 'folderExpanded' : 'folderCollapsed';
		updateNodeDetails(tree[idx]);
	};

	const handleDoubleClick = (node: File | Folder) => {
		if (config.rename === 'Both' || config.rename === 'DoubleClick') {
			setIsRenameSelected(true);
			setCurrentlySelectedNode(node);
			setRenameNodeId(node.id);
		}
	};

	const renameNode = (idx: number) => {
		let fileName = renameInputRef.current?.value!;
		fileName = fileName.replace(/[\\/]/g, '');
		if (!fileName) return;

		let fileNameBrokenArray = fileName.split('.');
		const filePath = tree[idx].filePath.split('/');
		filePath[filePath.length - 1] = fileName;

		tree[idx].name = fileName;
		tree[idx].filePath = filePath.join('/');
		delete tree[idx].new;
		if (tree[idx].type === 'File') {
			const ref = tree[idx] as File;
			const extension = fileNameBrokenArray[fileNameBrokenArray.length - 1];
			ref.extension = extension;
			ref.icon = extension;
		}

		setRenameNodeId(null);
		setIsRenameSelected(false);
		updateNodeDetails(tree[idx]);
	};

	const handleFileRename = (event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>, idx: number) => {
		event.stopPropagation();
		if (event.key === 'Enter') {
			renameNode(idx);
		}
	};

	const enableRenameAndDeleteForSelectedNode = (e: React.KeyboardEvent<HTMLDivElement>, node: File | Folder) => {
		if (e.key === 'Enter' && !isRenameSelected && (config.rename === 'Both' || config.rename === 'Enter')) {
			setIsRenameSelected(true);
			setCurrentlySelectedNode(node);
			setRenameNodeId(node.id);
		}

		if (e.key === 'Delete' && (config.delete === 'Both' || config.delete === 'Delete')) {
			deleteNode(node.id);
		}

		if ((e.metaKey || e.ctrlKey) && e.keyCode === 8 && (config.delete === 'Both' || config.delete === 'CMD + Backspace')) {
			deleteNode(node.id);
		}
	};

	const checkForDeleteCondition = (idx: number) => {
		const fileName = renameInputRef.current?.value!;
		if (tree[idx].new && !fileName) {
			deleteNode(tree[idx].id);
		}
	};

	const handleBlur = (idx: number) => {
		console.log('ON BLUR');
		checkForDeleteCondition(idx);
		renameNode(idx);
		setRenameNodeId(null);
		setIsRenameSelected(false);
	};

	useEffect(() => {
		if (isRenameSelected) {
			renameInputRef.current?.focus();
			renameInputRef.current?.select();
		}
	}, [isRenameSelected]);

	return (
		<div style={{ fontSize: '16px' }}>
			{tree.map((node: File | Folder, index: number) => {
				return (
					<div style={{ marginLeft: 5 }} key={node.id}>
						<div
							style={{
								cursor: 'pointer',
								display: 'flex',
								width: '100%',
								...(currentlySelectedNode?.id === node.id ? { backgroundColor: '#bcbcb7' } : {}),
							}}
							tabIndex={0}
							onClick={() => handleSingleClick(node, index)}
							onDoubleClick={() => handleDoubleClick(node)}
							onKeyDown={(e) => enableRenameAndDeleteForSelectedNode(e, node)}>
							{isRenameSelected && node.id === renameNodeId ? (
								<input
									type='text'
									defaultValue={node.name}
									placeholder='Enter Name'
									ref={renameInputRef}
									onKeyDown={(e) => handleFileRename(e, index)}
									onBlur={() => handleBlur(index)}
								/>
							) : (
								<div style={{ display: 'flex' }}>
									<span style={{ marginRight: 5 }}>
										<IconMapComponent iconName={node.icon} iconMap={iconMap} />
									</span>
									<span>{node.name}</span>
								</div>
							)}
						</div>

						{node.type === 'Folder' && node.children.length > 0 && node.expanded && (
							<>
								<div style={{ marginLeft: 15 }}>
									{node.type === 'Folder' && node.children.length > 0 && (
										<FileTree
											key={node.id}
											tree={node.children}
											updateNodeDetails={updateNodeDetails}
											deleteNode={deleteNode}
											config={config}
											iconMap={iconMap}
										/>
									)}
								</div>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default React.memo(FileTree);
