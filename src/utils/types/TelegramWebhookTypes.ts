export type AnimationType = {
  mime_type: string;
  duration: number;
  width: number;
  height: number;
  thumb: ThumbType;
  thumbnail: ThumbType;
  file_id: string;
  file_unique_id: string;
  file_size: number;
}

export type AudioType = {
  duration: number;
  filename?: string;
  mime_type?: string;
  title?: string;
  performer?: string;
  file_id: string;
  file_unique_id: string;
  file_size?: number;
}

export type ChatType = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  title?: string;
  type: string;
  all_members_are_administrators?: boolean;
}

export type DocumentType = {
  file_name?: string;
  mime_type?: string;
  thumb?: ThumbType;
  thumbnail?: ThumbType;
  file_id: string;
  file_unique_id: string;
  file_size?: number;
}

export type PhotoType = {
  file_id: string;
  file_unique_id: string;
  file_size?: number;
  width: number;
  height: number;
}

export type StickerType = {
  width: number;
  height: number;
  emoji: string;
  set_name?: string;
  is_animated?: boolean;
  is_video?: boolean;
  type: string;
  thumbnail?: ThumbType;
  thumb?: ThumbType;
  file_id: string;
  file_unique_id: string;
  file_size?: number;
}

export type ThumbType = {
  file_id: string;
  file_unique_id: string;
  file_size?: number;
  width?: number;
  height?: number;
}

export type UserType = {
  id: number
  is_bot: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
}

export type VideoNoteType = {
  duration: number;
  length: number;
  thumb?: ThumbType;
  thumbnail?: ThumbType;
  file_id: string;
  file_unique_id: string;
  file_size?: number;
}

export type VideoType = {
  duration: number;
  width: number;
  height: number;
  mime_type: string;
  thumb?: ThumbType;
  thumbnail?: ThumbType;
  file_id: string;
  file_unique_id: string;
  file_size?: number;
}

export type VoiceType = {
  duration: number;
  mime_type?: string;
  file_id: string;
  file_unique_id: string;
  file_size?: number;
}

export type WebhookRequestType = {
  update_id: number;
  message: {
    message_id: number;
    from: UserType;
    chat: ChatType;
    date: number;
    text?: string;
    entities?: {
      offset: number;
      length: number;
      type: string;
    }[];
    document?: DocumentType;
    animation?: AnimationType;
    photo?: PhotoType[];
    sticker?: StickerType;
    video?: VideoType;
    audio?: AudioType;
    voice?: VoiceType;
    video_note?: VideoNoteType;
    has_media_spoiler?: boolean;
    reply_to_message?: WebhookRequestType['message'];

    // not used for now
    contact?: any;
    location?: any;
    venue?: any;
    new_chat_participant?: any;
    new_chat_members?: any;
    left_chat_participant?: any;
    left_chat_member?: any;
    new_chat_title?: any;
    new_chat_photo?: any;
    delete_chat_photo?: any;
    group_chat_created?: any;
    supergroup_chat_created?: any;
    channel_chat_created?: any;
    migrate_to_chat_id?: any;
    migrate_from_chat_id?: any;
    pinned_message?: any;
    invoice?: any;
    successful_payment?: any;
  };
}