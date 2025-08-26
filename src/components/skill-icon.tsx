'use client';
import {
  ChefHat,
  Guitar,
  Code,
  Languages,
  PersonStanding,
  Camera,
  Sprout,
  Paintbrush,
  HelpCircle,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';

const iconMap: Record<string, ComponentType<LucideProps>> = {
  cooking: ChefHat,
  guitar: Guitar,
  coding: Code,
  spanish: Languages,
  yoga: PersonStanding,
  photography: Camera,
  gardening: Sprout,
  painting: Paintbrush,
};

type SkillIconProps = LucideProps & {
  skillId: string;
};

export function SkillIcon({ skillId, ...props }: SkillIconProps) {
  const Icon = iconMap[skillId] || HelpCircle;
  return <Icon {...props} />;
}
