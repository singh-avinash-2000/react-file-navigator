# React File Navigator

React File Navigator is a React component that provides a file explorer UI with features similar to VSCode. It allows you to render a file tree structure and interact with files and folders.

For queries / feature request reachout : workwith.avinashsingh@gmail.com

## Installation

You can install React File Navigator via npm:

```
npm install react-file-navigator
```

or with yarn:

```
yarn add react-file-navigator
```

## Usage

```
import React, { useState } from 'react';
import { IoLogoReact, IoDocumentText } from 'react-icons/io5';
import { IoLogoJavascript } from 'react-icons/io';
import { DownOutlined, RightOutlined } from '@ant-design/icons';

import { Explorer, IconMap, Tree, TreeNode } from 'react-file-navigator';

const App: React.FC = () => {
	const [tree, setTree] = useState<Tree>([]);
	const handleFileSelectionChange = (_selectedFile: TreeNode | null) => {
		console.log(_selectedFile);
	};

	const iconMap: IconMap = {
		default: <IoDocumentText />, // required
		folderCollapsed: <RightOutlined />, // required
		folderExpanded: <DownOutlined />, // required
		tsx: <IoLogoReact />,
		jsx: <IoLogoReact />,
		js: <IoLogoJavascript />,
	};

	return <Explorer tree={tree} setTree={setTree} onFileSelectionChange={handleFileSelectionChange} iconMap={iconMap} />;
};

export default App;
```

## Props

### tree

    Type: TreeNode[]
    Description: An array representing the file tree structure. Each element can be either a FileNode or a FolderNode.

### setTree

    Type: React.Dispatch<React.SetStateAction<Tree>> // useState's state setter
    Description: A function to update the file tree structure.

### onFileSelectionChange

    Type: (node: TreeNode | null) => any
    Description: A callback function that is called when ever file folder selection changes in the file explorer.

### iconMap

    Type: IconMap
    Description: An object mapping file extensions to React icons. You can provide custom icons for different file types. Will be picked from icon property of TreeNode

### config

    Type: ExplorerConfig
    Description: Configuration options for the file explorer component.

## Types

### TreeNode

```
    FileNode | FolderNode
```

### FileNode

```
    id: string;
	type: 'File';
	filePath: string;
	extension: string;
	icon: string;
	name: string;
	[key: string]: any;
```

### FolderNode

```
    id: string;
	type: 'Folder';
	filePath: string;
	expanded: boolean;
	icon: 'folderCollapsed' | 'folderExpanded';
	name: string;
	children: TreeNode[];
	[key: string]: any;
```

### ExplorerProps

```
    tree: Tree;
	setTree: React.Dispatch<React.SetStateAction<Tree>>;
	config: ExplorerConfig; //optional
	iconMap: IconMap;
	onFileSelectionChange: (node: TreeNode | null) => any;
```

### ExplorerConfig

```
    label: string;
	rename: 'DoubleClick' | 'Enter' | 'Both';
	delete: 'Delete' | 'CMD + Backspace' | 'Both';
	fontColor: string;
	accentColor: string;
	headerFontSize: string;
	headerIconSize: string;
	fontSize: string;
	iconSize: string;
	disableActions: boolean;
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
