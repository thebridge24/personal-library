// -------------------- DATA --------------------
import { useState, type JSX } from "react";
import {
  Image as ImageIcon,
  File as FileIcon,
  FileText,
  FileArchive,
} from "lucide-react";

interface FileUploadProps {
  label: string; 
  onSelect: (file: File | null) => void;
  accepted?: string;
  required?: boolean;
}

const fileIcons: Record<string, JSX.Element> = {
  image: <ImageIcon size={22} />,
  pdf: <FileText size={22} />,
  doc: <FileText size={22} />,
  zip: <FileArchive size={22} />,
  default: <FileIcon size={22} />,
};

// -------------------- LOGIC --------------------
export default function FileUpload({
  label,
  onSelect,
  accepted = "image/*,.pdf,.doc,.docx,.zip",
  required = false,
}: FileUploadProps) {
  const [selected, setSelected] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState("default");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelected(file);
    setUploaded(false);
    onSelect(file);

    const type = file.type;
    if (type.startsWith("image/")) {
      setPreviewType("image");
      setPreviewURL(URL.createObjectURL(file));
    } else if (type === "application/pdf") {
      setPreviewType("pdf");
      setPreviewURL(null);
    } else if (
      type === "application/msword" ||
      type.includes("wordprocessingml")
    ) {
      setPreviewType("doc");
      setPreviewURL(null);
    } else if (type.includes("zip")) {
      setPreviewType("zip");
      setPreviewURL(null);
    } else {
      setPreviewType("default");
      setPreviewURL(null);
    }

    simulateUpload();
  };

  const simulateUpload = () => {
    setUploading(true);
    setProgress(0);
    let p = 0;

    const timer = setInterval(() => {
      p += 8;
      if (p >= 100) {
        clearInterval(timer);
        p = 100;
        setUploading(false);
        setUploaded(true);
      }
      setProgress(p);
    }, 200);
  };

  return (
    <div className="mt-4">
      <label className="text-white mb-2 block">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <input
        type="file"
        accept={accepted}
        onChange={handleSelect}
        className="hidden"
        id="fileInput"
      />

      <label
        htmlFor="fileInput"
        className="cursor-pointer bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-xl flex items-center gap-3"
      >
        <FileIcon size={20} /> Choose File
      </label>

      {selected && (
        <div className="mt-4 p-4 bg-white/10 rounded-xl flex items-center gap-4 text-white">
          {previewType === "image" ? (
            <img
              src={previewURL!}
              alt="preview"
              className="w-14 h-14 rounded-lg object-cover border border-white/20"
            />
          ) : (
            <div className="p-3 bg-white/20 rounded-lg">
              {fileIcons[previewType] || fileIcons.default}
            </div>
          )}

          <div className="flex-1">
            <p className="text-sm font-semibold">{selected.name}</p>

            {uploading && (
              <div className="mt-2">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="bg-brandBlue h-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-white/80">
                  Uploading… {progress}% — DO NOT close your browser.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


{/*
   --------------- How to use ---------------
    <FileUpload
  label="Upload Document (optional)"
  onSelect={(file) => setSelectedFile(file)}
/> */}
