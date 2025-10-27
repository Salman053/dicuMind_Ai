"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onRoomCreated: () => void;
}

export default function CreateRoomModal({ open, setOpen, onRoomCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return toast.error("Room title is required");

    setLoading(true);
    const { data: user } = await supabase.auth.getUser();
    console.log(user)

    const { error } = await supabase.from("study_rooms").insert([
      {
        title,
        description,
        created_by: user?.user?.id,
      },
    ]);

    if (error) {
      toast.error(error.message);
      console.log(error)
    } else {
      toast.success("Room created!");
      setOpen(false);
      setTitle("");
      setDescription("");
      onRoomCreated();
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Study Room</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Room Title</Label>
            <Input
              placeholder="e.g., Math Discussion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              placeholder="e.g., Algebra"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button onClick={handleCreate} disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Room"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
