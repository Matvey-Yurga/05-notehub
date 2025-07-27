export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface Note {
    id: string;
    title: string;
    content: string;
    tag: string;
    
}
export interface NoteData {
    title: string;
    content: string;
    tag: NoteTag;
 }
