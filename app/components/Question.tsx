'use client';
import React from 'react';

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function Question({ label, value, onChange, placeholder }: Props) {
  return (
    <div className="my-6">
      <label className="block font-semibold text-lg mb-2">{label}</label>
      <input
        type="text"
        className="w-full rounded-2xl border p-3 focus:outline-none focus:ring"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}