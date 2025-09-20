'use client';

import { useChat } from '@ai-sdk/react';
import { CopyIcon, MessageSquare } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Action, Actions } from '@/components/ai-elements/actions';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Loader } from '@/components/ai-elements/loader';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Response } from '@/components/ai-elements/response';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion';

const models = [
  {
    name: 'GPT 4o',
    value: 'gpt-4o',
  },
  {
    name: 'GPT 5',
    value: 'gpt-5',
  },
];

const suggestions = [
  'What are the ingredients for a classic Old Fashioned?',
  'How do I make a perfect Manhattan cocktail?',
  'What\'s the difference between bourbon and whiskey?',
  'Can you suggest a good cocktail for someone who likes fruity drinks?',
  'What are some essential tools every home bartender should have?',
];

const ChatBotDemo = () => {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[0].value);
  const { messages, append, isLoading } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      append(
        { role: 'user', content: input },
        {
          body: {
            model: model,
          },
        }
      );
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    append(
      { role: 'user', content: suggestion },
      {
        body: {
          model: model,
        },
      }
    );
  };

  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col p-6">
      <div className="flex h-full min-h-0 flex-col">
        <Conversation className="relative min-h-0 w-full flex-1 overflow-hidden">
          <ConversationContent>
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<MessageSquare className="size-12" />}
                title="No messages yet"
                description="Start a conversation to see messages here"
              />
            ) : (
              messages.map((message, messageIndex) => (
                <div key={message.id}>
                  <Message from={message.role}>
                    <MessageContent>
                      <Response key={`${message.id}`}>
                        {message.content}
                      </Response>
                    </MessageContent>
                  </Message>
                  {message.role === 'assistant' &&
                    messageIndex === messages.length - 1 && (
                      <Actions className="mt-2">
                        <Action
                          onClick={() =>
                            navigator.clipboard.writeText(message.content)
                          }
                          label="Copy"
                        >
                          <CopyIcon className="size-3" />
                        </Action>
                      </Actions>
                    )}
                </div>
              ))
            )}
            {isLoading && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <Suggestions>
          {suggestions.map(suggestion => (
            <Suggestion
              key={suggestion}
              onClick={handleSuggestionClick}
              suggestion={suggestion}
            />
          ))}
        </Suggestions>

        <PromptInput onSubmit={handleSubmit} className="mt-4 flex-shrink-0">
          <PromptInputTextarea
            onChange={e => setInput(e.target.value)}
            value={input}
          />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputModelSelect
                onValueChange={value => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map(model => (
                    <PromptInputModelSelectItem
                      key={model.value}
                      value={model.value}
                    >
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input || isLoading} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatBotDemo;
