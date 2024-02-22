import React from 'react';
import Explorer from './components/Explorer';
import { ExplorerContextProvider } from './context/useExplorerContext';
import { ExplorerProps } from './util/types';

const App: React.FC<ExplorerProps> = ({ tree, setTree, config = {}, iconMap }) => {
	return (
		<ExplorerContextProvider>
			<Explorer tree={tree} setTree={setTree} config={config} iconMap={iconMap} />
		</ExplorerContextProvider>
	);
};

export default App;
