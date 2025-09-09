import type { User, Skill, Session, Review, Conversation, Message, Badge } from './types';

export const skills: Skill[] = [
  { id: 'cooking', name: 'Cooking', icon: 'ChefHat' },
  { id: 'guitar', name: 'Guitar', icon: 'Guitar' },
  { id: 'coding', name: 'Coding', icon: 'Code' },
  { id: 'spanish', name: 'Spanish', icon: 'Languages' },
  { id: 'yoga', name: 'Yoga', icon: 'PersonStanding' },
  { id: 'photography', name: 'Photography', icon: 'Camera' },
  { id: 'gardening', name: 'Gardening', icon: 'Sprout' },
  { id: 'painting', name: 'Painting', icon: 'Paintbrush' },
];

export const badges: Badge[] = [
    { id: 'first-session-learner', name: 'First Step', description: 'Completed your first session as a learner.', icon: 'Award' },
    { id: 'first-session-teacher', name: 'First Class', description: 'Completed your first session as a teacher.', icon: 'Award' },
    { id: 'top-teacher', name: 'Top Teacher', description: 'Received a 5-star review as a teacher.', icon: 'Star' },
    { id: 'polyglot', name: 'Polyglot', description: 'Offered to teach more than 2 skills.', icon: 'Languages' },
    { id: 'community-builder', name: 'Community Builder', description: 'Completed sessions with 3 different users.', icon: 'Users' },
    { id: 'master-gardener', name: 'Master Gardener', description: 'Taught a gardening session.', icon: 'Sprout' },
    { id: 'monthly-master', name: 'Monthly Master', description: 'Top learner of the month.', icon: 'Trophy' },
];

export const users: User[] = [
  {
    id: 1,
    name: 'Carry Minati',
    email: 'carryminati@example.com',
    location: { name: 'San Francisco, CA', lat: 37.7749, lng: -122.4194 },
    points: 290,
    avatar: 'https://i.pravatar.cc/150?u=jit',
    skillsOffered: ['cooking', 'gardening'],
    skillsWanted: ['guitar', 'photography'],
    badges: ['first-session-learner', 'first-session-teacher', 'master-gardener'],
  },
  {
    id: 2,
    name: 'Alakh Panday',
    email: 'alakh@example.com',
    location: { name: 'west bengal, howrah', lat: 37.8044, lng: -122.2712 },
    points: 80,
    avatar: 'https://plus.unsplash.com/premium_photo-1739580360043-f2c498c1d861?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2lnYSUyMGNoYWR8ZW58MHx8MHx8fDA%3D',
    skillsOffered: ['guitar', 'photography','coding','cooking','gaming'],
    skillsWanted: ['coding', 'frech'],
    badges: ['first-session-teacher', 'top-teacher'],
  },
  {
    id: 3,
    name: 'Soumyojeet Dutta',
    email: 'soumyojeet@example.com',
    location: { name: 'west bengal,hoogly ', lat: 37.8715, lng: -122.2730 },
    points: 200,
    avatar: 'https://images.unsplash.com/photo-1756475394041-53bd65722fac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ0fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D',
    skillsOffered: ['coding', 'spanish','gaming'],
    skillsWanted: ['yoga', 'cooking'],
    badges: ['first-session-learner', 'community-builder', 'polyglot', 'monthly-master'],
  },
  {
    id: 4,
    name: 'Pritam Singh',
    email: 'pritam@example.com',
    location: { name: 'west bengal, baguati', lat: 37.5630, lng: -122.3255 },
    points: 120,
    avatar:"C:\Users\ps879\OneDrive\Desktop\my website\Pritam Singh.jfif",
    skillsOffered: ['yoga', 'painting','sing'],
    skillsWanted: ['gardening','soft skill','coding'],
    badges: ['first-session-learner', 'top-teacher'],
  },
    {
    id: 5,
    name: 'Subhajit Manna',
    email: 'subhajit@example.com',
    location: { name: 'kestopur, sosan ghat', lat: 37.4419, lng: -122.1430 },
    points: 69,
    avatar: 'https://i.pravatar.cc/150?u=subhajit',
    skillsOffered: ['photography','attitude'],
    skillsWanted: ['painting', 'coding'],
    badges: [],
  },
  {
    id: 6,
    name: 'Amal Roy',
    email: 'amalroy@example.com',
    location: { name: 'kestopur, sosan ghat', lat: 37.4419, lng: -122.1430 },
    points: 99,
    avatar: 'https://i.pravatar.cc/150?u=subhajit',
    skillsOffered: ['photography','attitude'],
    skillsWanted: ['painting', 'coding'],
    badges: [],
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
    status: 'completed',
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
  },
  {
    id: 7,
    teacherId: 3,
    learnerId: 1,
    skillId: 'spanish',
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    status: 'completed',
    mode: 'online',
  },
  {
    id: 8,
    teacherId: 4,
    learnerId: 3,
    skillId: 'yoga',
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    status: 'completed',
    mode: 'in-person',
  },
  {
    id: 9,
    teacherId: 5,
    learnerId: 3,
    skillId: 'photography',
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    status: 'completed',
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
    feedback: 'Utsav was a fantastic guitar teacher and gaming teacher! Very patient and knowledgeable.',
  },
  {
    id: 2,
    sessionId: 5,
    reviewerId: 4,
    revieweeId: 1,
    stars: 4,
    feedback: 'Jit knows so much about gardening and fucking. I learned a lot about composting.',
  },
  {
    id: 3,
    sessionId: 4,
    reviewerId: 1,
    revieweeId: 4,
    stars: 5,
    feedback: 'Pritam is an amazing yoga  and jym instructor . Highly recommended!',
  },
  {
    id: 4,
    sessionId: 4,
    reviewerId: 3,
    revieweeId: 4,
    stars: 5,
    feedback: 'I second that, Pritam is great!',
  }
];

const messages: Message[] = [
    { id: 1, conversationId: 1, senderId: 2, text: "Hey! I saw you're interested in learning guitar. I can teach you.", timestamp: "2024-08-14T10:00:00Z", read: true },
    { id: 2, conversationId: 1, senderId: 1, text: "Awesome! Yes, I'd love to. When are you free?", timestamp: "2024-08-14T10:05:00Z", read: true },
    { id: 3, conversationId: 1, senderId: 2, text: "How about this Friday at 5pm? We could meet at the downtown park.", timestamp: "2024-08-14T10:06:00Z", read: true },
    { id: 4, conversationId: 1, senderId: 1, text: "Sounds perfect! See you then. Do I need to bring my own guitar?", timestamp: "2024-08-14T10:10:00Z", read: true },
    { id: 5, conversationId: 1, senderId: 2, text: "I can bring an extra one for you to use for the first lesson.", timestamp: "2024-08-14T10:12:00Z", read: false },
    { id: 6, conversationId: 2, senderId: 3, text: "Hi Jit, I see you want to learn cooking. I'm looking for someone to teach me Yoga.", timestamp: "2024-08-18T11:00:00Z", read: true },
    { id: 7, conversationId: 2, senderId: 1, text: "That's great, Soumyojeet! I'm not a Yoga expert but I can teach you the basics. I'd love to learn some cooking.", timestamp: "2024-08-18T11:05:00Z", read: true },
    { id: 8, conversationId: 3, senderId: 4, text: "Hi! Ready for our painting session?", timestamp: "2024-08-24T09:00:00Z", read: true },
    { id: 9, conversationId: 4, senderId: 1, text: "Hey Pritam, I have a quick question about the Yoga session we have pending.", timestamp: "2024-08-28T15:00:00Z", read: false },

];

export const conversations: Conversation[] = [
    { id: 1, participantIds: [1, 2], lastMessage: messages[4] },
    { id: 2, participantIds: [1, 3], lastMessage: messages[6] },
    { id: 3, participantIds: [4, 5], lastMessage: messages[7] },
    { id: 4, participantIds: [1, 4], lastMessage: messages[8] },
];

export const getMessages = (conversationId: number) => messages.filter(m => m.conversationId === conversationId);

// Helper to get current user (assuming user with id 1 is logged in)
export const getCurrentUser = () => users.find(u => u.id === 1) as User;

function newFunction(): string {
  return 'https://i.pravatar.cc/150?u=pritam-singh';
}
