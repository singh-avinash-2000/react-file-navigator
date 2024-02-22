import { IconMap } from '../util/types';

interface IconMapProps {
	iconName: 'tsx' | 'jsx' | 'js' | 'html' | 'css' | 'scss' | 'folderCollapsed' | 'folderExpanded' | string;
	iconMap: IconMap;
}

const IconMap: React.FC<IconMapProps> = ({ iconName, iconMap }) => {
	const icon = iconMap[iconName] || iconMap.default;
	return <div>{icon}</div>;
};

export default IconMap;
