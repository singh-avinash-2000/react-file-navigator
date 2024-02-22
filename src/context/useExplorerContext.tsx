import React, { createContext, useContext, useState } from 'react';
import { Folder, File } from '../util/types';

interface ExplorerContextProps {
	currentlySelectedNode: File | Folder | null;
	setCurrentlySelectedNode: React.Dispatch<React.SetStateAction<File | Folder | null>>;
	isRenameSelected: boolean;
	setIsRenameSelected: React.Dispatch<React.SetStateAction<boolean>>;
	renameNodeId: string | null;
	setRenameNodeId: React.Dispatch<React.SetStateAction<string | null>>;
}

const defaultValue: ExplorerContextProps = {
	currentlySelectedNode: null,
	setCurrentlySelectedNode: () => {},
	isRenameSelected: false,
	setIsRenameSelected: () => {},
	renameNodeId: null,
	setRenameNodeId: () => {},
};

const ExplorerContext = createContext(defaultValue);

export const ExplorerContextProvider = ({ children }: { children: any }) => {
	const [currentlySelectedNode, setCurrentlySelectedNode] = useState<File | Folder | null>(null);
	const [isRenameSelected, setIsRenameSelected] = useState<boolean>(false);
	const [renameNodeId, setRenameNodeId] = useState<string | null>(null);

	const value: ExplorerContextProps = {
		currentlySelectedNode,
		setCurrentlySelectedNode,
		isRenameSelected,
		setIsRenameSelected,
		renameNodeId,
		setRenameNodeId,
	};

	return <ExplorerContext.Provider value={value}>{children}</ExplorerContext.Provider>;
};

export const useExplorerContext = () => useContext(ExplorerContext);
