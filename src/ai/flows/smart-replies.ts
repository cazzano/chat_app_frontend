// Temporary mock implementation for static export
export type GenerateSmartRepliesInput = {
  message: string;
};

export type GenerateSmartRepliesOutput = {
  replies: string[];
};

export async function generateSmartReplies(input: GenerateSmartRepliesInput): Promise<GenerateSmartRepliesOutput> {
  // Mock replies for now
  return {
    replies: ["Thanks!", "Got it!", "Sounds good!"]
  };
}