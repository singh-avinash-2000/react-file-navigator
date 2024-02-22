export type Tree = (File | Folder)[];
export type IconMap = { default: React.ReactNode; [extension: string]: React.ReactNode };

export interface File {
	id: string;
	type: 'File';
	filePath: string;
	extension: string;
	icon: string;
	name: string;
	new?: boolean;
}

export interface Folder {
	id: string;
	type: 'Folder';
	filePath: string;
	expanded: boolean;
	icon: 'folderCollapsed' | 'folderExpanded';
	name: string;
	children: (File | Folder)[];
	new?: boolean;
}

export interface ExplorerProps {
	tree: Tree;
	setTree: React.Dispatch<React.SetStateAction<Tree>>;
	config?: ExplorerConfig;
	iconMap: IconMap;
}

export interface ExplorerConfig {
	label?: string;
	rename?: 'DoubleClick' | 'Enter' | 'Both';
	delete?: 'Delete' | 'CMD + Backspace' | 'Both';
	fontColor?: string;
	// dragDrop?: boolean;
}
