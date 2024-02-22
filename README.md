# React File Navigator

React File Navigator is a React component that provides a file explorer UI with features similar to VSCode. It allows you to render a file tree structure and interact with files and folders.

For queries reachout : workwith.avinashsingh@gmail.com

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
import { File, Explorer, Folder, IconMap, Tree, ExplorerConfig } from 'react-file-navigator';
import { IoLogoCss3, IoLogoReact, IoLogoHtml5, IoLogoSass, IoDocumentText } from 'react-icons/io5';
import { IoLogoJavascript } from 'react-icons/io';
import { DownOutlined, RightOutlined } from '@ant-design/icons';

const FileExplorer: React.FC = () => {
    const [tree, setTree] = useState<Tree>([]);

    const handleFileSelectionChange = (currentFile: File | Folder | null) => {
        console.log(currentFile);
    };

    const iconMap: IconMap = {
        tsx: <IoLogoReact />,
        jsx: <IoLogoReact />,
        js: <IoLogoJavascript />,
        html: <IoLogoHtml5 />,
        css: <IoLogoCss3 />,
        scss: <IoLogoSass />,
        default: <IoDocumentText />,
        folderCollapsed: <RightOutlined />,
        folderExpanded: <DownOutlined />,
    };

    const config: ExplorerConfig = {
        accentColor: 'lavender',
        delete: 'Both', // Binds delete action to key board buttons - Options - Both , Delete, CMD + Backspace
        fontColor: 'black',
        label: 'File Explorer',
        rename: 'Both', // Binds rename action - Options - Both , DoubleClick, Enter // double click file or click and hit enter or both :)
    };

    return (
        <>
            <Explorer tree={tree} setTree={setTree} onFileSelectionChange={(node) => handleFileSelectionChange(node)} iconMap={iconMap} config={config} />
        </>
    );
};

export default FileExplorer;
```

## Props

### tree

    Type: (File | Folder)[]
    Description: An array representing the file tree structure. Each element can be either a File or a Folder.

### setTree

    Type: React.Dispatch<React.SetStateAction<Tree>>
    Description: A function to update the file tree structure.

### onFileSelectionChange

    Type: (node: File | Folder | null) => any
    Description: A callback function that is called when a file or folder is selected in the file explorer.

### iconMap

    Type: IconMap
    Description: An object mapping file extensions to React icons. You can provide custom icons for different file types.

### config

    Type: ExplorerConfig
    Description: Configuration options for the file explorer component, including accent color, font color, label, delete action, and rename action.

## Types

### File

### Properties:

    id (string): Unique identifier for the file.
    type ('File'): Indicates that it's a file.
    filePath (string): Path to the file.
    extension (string): File extension.
    icon (string): Icon for the file.
    name (string): Name of the file.
    new? (boolean): Optional property indicating if the file is new.

### Folder

### Properties:

    id (string): Unique identifier for the folder.
    type ('Folder'): Indicates that it's a folder.
    filePath (string): Path to the folder.
    expanded (boolean): Indicates if the folder is expanded.
    icon ('folderCollapsed' | 'folderExpanded'): Icon for the folder.
    name (string): Name of the folder.
    children (File[] | Folder[]): Array of files and folders within the folder.
    new? (boolean): Optional property indicating if the folder is new (used internally don't use this property).

### ExplorerConfig

### Properties:

    label? (string): Optional label for the file explorer component.
    rename? ('DoubleClick' | 'Enter' | 'Both'): Action for renaming files/folders.
    delete? ('Delete' | 'CMD + Backspace' | 'Both'): Action for deleting files/folders.
    fontColor? (string): Font color for the file explorer.
    accentColor? (string): Accent color for the file explorer.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
