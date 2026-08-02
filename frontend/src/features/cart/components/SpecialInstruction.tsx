import { useState } from "react";

interface SpecialInstructionProps {
  value: string;
  onSave: (notes: string) => void;
}

export default function SpecialInstruction({
  value,
  onSave,
}: SpecialInstructionProps) {
  const [notes, setNotes] =
    useState(value);

  return (
    <div className="mt-3">
      <textarea
        rows={2}
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        placeholder="Special instructions..."
        className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none transition focus:border-indigo-500"
      />

      <div className="mt-2 flex justify-end">
        <button
          onClick={() => onSave(notes)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}