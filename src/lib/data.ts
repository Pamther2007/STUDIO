import type { User, Skill, Session, Review } from './types';

export const skills: Skill[] = [
  { id: 'cooking', name: 'Cooking', icon: 'ChefHat' },
  { id: 'guitar', name: 'Guitar', icon: 'Guitar' },
  { id: 'coding', name: 'Coding', icon: 'Code' },
  { id: 'spanish', name: 'Spanish', icon: 'Languages' },
  { id: 'yoga', name: 'Yoga', icon: 'Yoga' },
  { id: 'photography', name: 'Photography', icon: 'Camera' },
  { id: 'gardening', name: 'Gardening', icon: 'Sprout' },
  { id: 'painting', name: 'Painting', icon: 'Paintbrush' },
];

export const users: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    location: { name: 'San Francisco, CA', lat: 37.7749, lng: -122.4194 },
    points: 150,
    avatar: 'https://i.pravatar.cc/150?u=alice',
    skillsOffered: ['cooking', 'gardening'],
    skillsWanted: ['guitar', 'photography'],
  },
  {
    id: 2,
    name: 'Bob Williams',
    email: 'bob@example.com',
    location: { name: 'Oakland, CA', lat: 37.8044, lng: -122.2712 },
    points: 80,
    avatar: 'https://i.pravatar.cc/150?u=bob',
    skillsOffered: ['guitar', 'photography'],
    skillsWanted: ['coding', 'spanish'],
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    location: { name: 'Berkeley, CA', lat: 37.8715, lng: -122.2730 },
    points: 200,
    avatar: 'https://i.pravatar.cc/150?u=charlie',
    skillsOffered: ['coding', 'spanish'],
    skillsWanted: ['yoga', 'cooking'],
  },
  {
    id: 4,
    name: 'Diana Prince',
    email: 'diana@example.com',
    location: { name: 'San Mateo, CA', lat: 37.5630, lng: -122.3255 },
    points: 120,
    avatar: 'https://i.pravatar.cc/150?u=diana',
    skillsOffered: ['yoga', 'painting'],
    skillsWanted: ['gardening'],
  },
    {
    id: 5,
    name: 'Ethan Hunt',
    email: 'ethan@example.com',
    location: { name: 'Palo Alto, CA', lat: 37.4419, lng: -122.1430 },
    points: 95,
    avatar: 'https://i.pravatar.cc/150?u=ethan',
    skillsOffered: ['photography'],
    skillsWanted: ['painting', 'coding'],
  },
];

export const sessions: Session[] = [
  {
    id: 1,
    teacherId: 2,
    learnerId: 1,
    skillId: 'guitar',
    date: '2024-08-15T10:00:00Z',
    status: 'completed',
    mode: 'in-person',
  },
  {
    id: 2,
    teacherId: 1,
    learnerId: 3,
    skillId: 'cooking',
    date: '2024-08-20T18:00:00Z',
    status: 'confirmed',
    mode: 'in-person',
  },
  {
    id: 3,
    teacherId: 3,
    learnerId: 2,
    skillId: 'coding',
    date: '2024-08-22T14:00:00Z',
    status: 'confirmed',
    mode: 'online',
  },
  {
    id: 4,
    teacherId: 4,
    learnerId: 1,
    skillId: 'yoga',
    date: '2024-09-01T09:00:00Z',
    status: 'pending',
    mode: 'online',
  },
  {
    id: 5,
    teacherId: 1,
    learnerId: 4,
    skillId: 'gardening',
    date: '2024-07-30T11:00:00Z',
    status: 'completed',
    mode: 'in-person',
  },
  {
    id: 6,
    teacherId: 2,
    learnerId: 5,
    skillId: 'photography',
    date: '2024-08-25T13:00:00Z',
    status: 'pending',
    mode: 'in-person',
  }
];

export const reviews: Review[] = [
  {
    id: 1,
    sessionId: 1,
    reviewerId: 1,
    revieweeId: 2,
    stars: 5,
    feedback: 'Bob was a fantastic guitar teacher! Very patient and knowledgeable.',
  },
  {
    id: 2,
    sessionId: 5,
    reviewerId: 4,
    revieweeId: 1,
    stars: 4,
    feedback: 'Alice knows so much about gardening. I learned a lot about composting.',
  },
];

// Helper to get current user (assuming user with id 1 is logged in)
export const getCurrentUser = () => users.find(u => u.id === 1) as User;
