import { Switch } from '@material-tailwind/react';
import React from 'react';

interface ToggleButtonProps {
  isActive: boolean;
  onChange?: (checked: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isActive, onChange }) => (
  <Switch
    checked={isActive}
    color='blue'
    crossOrigin={undefined}
    onChange={onChange}
    onPointerEnterCapture={undefined}
    onPointerLeaveCapture={undefined}
    size={20}
  />
);

export default ToggleButton;
