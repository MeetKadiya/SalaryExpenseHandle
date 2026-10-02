import React from 'react';
import {
  Home,
  PiggyBank,
  TrendingUp,
  Compass,
  ShieldCheck,
  GraduationCap,
  Coffee,
  Target,
  Briefcase,
  Users,
  Hourglass,
  Palmtree,
  Shield,
  Scale,
  Rocket,
  Building2,
  AlertCircle,
  Clock,
  CheckCircle2,
  User,
  HeartHandshake,
  Laptop,
  Car,
  Heart,
  Plane,
  Sunset,
} from 'lucide-react';
import type { CategoryKey, LifeStage, RiskPreference, LivingSituation, EmergencySavingsStatus, Dependents } from '../types/financial';

interface CategoryIconProps {
  category: CategoryKey | string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = 'w-5 h-5' }) => {
  switch (category) {
    case 'needs':
      return <Home className={className} />;
    case 'emergency':
      return <PiggyBank className={className} />;
    case 'investments':
      return <TrendingUp className={className} />;
    case 'retirement':
      return <Compass className={className} />;
    case 'insurance':
      return <ShieldCheck className={className} />;
    case 'growth':
      return <GraduationCap className={className} />;
    case 'lifestyle':
      return <Coffee className={className} />;
    case 'goals':
      return <Target className={className} />;
    default:
      return <Target className={className} />;
  }
};

export const LifeStageIcon: React.FC<{ stage: LifeStage; className?: string }> = ({ stage, className = 'w-6 h-6' }) => {
  switch (stage) {
    case 'student':
      return <GraduationCap className={className} />;
    case 'youngProfessional':
      return <Briefcase className={className} />;
    case 'family':
      return <Users className={className} />;
    case 'preRetirement':
      return <Hourglass className={className} />;
    case 'retired':
      return <Palmtree className={className} />;
    default:
      return <User className={className} />;
  }
};

export const RiskIcon: React.FC<{ risk: RiskPreference; className?: string }> = ({ risk, className = 'w-5 h-5' }) => {
  switch (risk) {
    case 'conservative':
      return <Shield className={className} />;
    case 'balanced':
      return <Scale className={className} />;
    case 'growth':
      return <Rocket className={className} />;
    default:
      return <Scale className={className} />;
  }
};

export const LivingIcon: React.FC<{ situation: LivingSituation; className?: string }> = ({ situation, className = 'w-5 h-5' }) => {
  switch (situation) {
    case 'family':
      return <Users className={className} />;
    case 'renting':
      return <Building2 className={className} />;
    case 'ownHouse':
      return <Home className={className} />;
    default:
      return <Home className={className} />;
  }
};

export const EmergencyStatusIcon: React.FC<{ status: EmergencySavingsStatus; className?: string }> = ({ status, className = 'w-5 h-5' }) => {
  switch (status) {
    case 'none':
      return <AlertCircle className={className} />;
    case '1to3':
      return <Clock className={className} />;
    case '3to6':
      return <ShieldCheck className={className} />;
    case '6plus':
      return <CheckCircle2 className={className} />;
    default:
      return <Clock className={className} />;
  }
};

export const DependentsIcon: React.FC<{ dependents: Dependents; className?: string }> = ({ dependents, className = 'w-5 h-5' }) => {
  switch (dependents) {
    case 'none':
      return <User className={className} />;
    case '1to2':
      return <Users className={className} />;
    case '3plus':
      return <HeartHandshake className={className} />;
    default:
      return <User className={className} />;
  }
};

export const GoalPresetIcon: React.FC<{ id: string; className?: string }> = ({ id, className = 'w-5 h-5' }) => {
  switch (id) {
    case 'emergency':
      return <ShieldCheck className={className} />;
    case 'gadget':
      return <Laptop className={className} />;
    case 'education':
      return <GraduationCap className={className} />;
    case 'car':
      return <Car className={className} />;
    case 'house':
      return <Home className={className} />;
    case 'marriage':
      return <Heart className={className} />;
    case 'travel':
      return <Plane className={className} />;
    case 'retirement':
      return <Sunset className={className} />;
    case 'custom':
    default:
      return <Target className={className} />;
  }
};
