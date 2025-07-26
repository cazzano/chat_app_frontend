import type { User, Conversation } from './types';

export const loggedInUser: User = {
  id: '1',
  name: 'Alex',
  avatar: 'https://placehold.co/100x100/D05CE3/FFFFFF.png',
  dataAiHint: 'man portrait',
  online: true,
};

const users: User[] = [
  loggedInUser,
  {
    id: '2',
    name: 'Sarah',
    avatar: 'https://placehold.co/100x100/3D5AFE/FFFFFF.png',
    dataAiHint: 'woman portrait',
    online: true,
  },
  {
    id: '3',
    name: 'Mike',
    avatar: 'https://placehold.co/100x100/283593/FFFFFF.png',
    dataAiHint: 'man face',
    online: false,
  },
  {
    id: '4',
    name: 'Emily',
    avatar: 'https://placehold.co/100x100/E91E63/FFFFFF.png',
    dataAiHint: 'woman face',
    online: true,
  },
];

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    users: [users[0], users[1]],
    messages: [
      {
        id: 'msg1',
        sender: users[1],
        content: "Hey Alex! Just saw the new designs. They look amazing! 🔥",
        timestamp: '10:30 AM',
        status: 'read',
      },
      {
        id: 'msg2',
        sender: users[0],
        content: "Thanks, Sarah! Glad you like them. I'm still tweaking the color palette for the dashboard.",
        timestamp: '10:31 AM',
        status: 'read',
      },
      {
        id: 'msg3',
        sender: users[1],
        content: "Ohh, exciting! Let me know if you need a second pair of eyes. I have some ideas about the accent color.",
        timestamp: '10:32 AM',
        status: 'delivered',
      },
    ],
  },
  {
    id: 'conv2',
    users: [users[0], users[2]],
    messages: [
      {
        id: 'msg4',
        sender: users[0],
        content: "Mike, did you get a chance to review the Q3 performance report?",
        timestamp: 'Yesterday',
        status: 'read',
      },
      {
        id: 'msg5',
        sender: users[2],
        content: "Yep, just finished. Overall numbers are solid, but I have a few questions about the marketing spend.",
        timestamp: 'Yesterday',
        status: 'sent',
      },
    ],
  },
  {
    id: 'conv3',
    users: [users[0], users[3]],
    messages: [
      {
        id: 'msg6',
        sender: users[3],
        content: "Are we still on for the team lunch tomorrow?",
        timestamp: '10:05 AM',
        status: 'read',
      },
      {
        id: 'msg7',
        sender: users[0],
        content: "Absolutely! 12:30 PM at The Corner Bistro. Don't be late! 😉",
        timestamp: '10:06 AM',
        status: 'delivered',
      },
       {
        id: 'msg8',
        sender: users[3],
        content: "Perfect, see you there!",
        timestamp: '10:07 AM',
        status: 'sent',
      },
    ],
  },
];
