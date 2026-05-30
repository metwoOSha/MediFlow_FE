import { BoneIcon } from '@/components/Icons/Specializations/BoneIcon';
import { BrainIcon } from '@/components/Icons/Specializations/BrainIcon';
import { EyeIcon } from '@/components/Icons/Specializations/EyeIcon';
import { HeartIcon } from '@/components/Icons/Specializations/HeartIcon';
import { LeafIcon } from '@/components/Icons/Specializations/LeafIcon';
import { PersonIcon } from '@/components/Icons/Specializations/PersonIcon';
import { PillIcon } from '@/components/Icons/Specializations/PillIcon';
import { SparkleIcon } from '@/components/Icons/Specializations/SparkleIcon';
import { ToothIcon } from '@/components/Icons/Specializations/ToothIcon';

export const SPECIALIZATION_CONFIG: Record<string, React.ReactNode> = {
    Cardiology: <HeartIcon />,
    Neurology: <BrainIcon />,
    Pediatrics: <PersonIcon />,
    Orthopedics: <BoneIcon />,
    Dermatology: <SparkleIcon />,
    Ophthalmology: <EyeIcon />,
    Dentistry: <ToothIcon />,
    'Internal Medicine': <PillIcon />,
    Pharmacology: <LeafIcon />,
};
