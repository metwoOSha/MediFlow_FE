import { GRADIENTS } from '@/config/Gradient.config';

export function getAvatarGradient(name: string) {
    const index = name.charCodeAt(0) % GRADIENTS.length;
    return GRADIENTS[index];
}
