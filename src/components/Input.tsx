
interface InputProps {
  labelText: string;
  idHtml: string;
  value?: string | number;
  onChange: (value: string) => void;
  type?: string; 
  placeholder?: string;
  isTextArea?: boolean;
}

export default function Input({
  labelText,
  idHtml,
  value,
  onChange,
  type = "text",
  placeholder = "",
  isTextArea= false,
}: InputProps) {
    
  return (
    <>
    {
        
    }
      <label className="font-medium" htmlFor={idHtml}>
        {labelText}
      </label>
      {
       isTextArea ? (
        <textarea
            id={idHtml}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="border p-2 rounded-2xl border-gray-200"        
        ></textarea>
       ) : (
        <input
            id={idHtml}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="border p-2 rounded-2xl border-gray-200"
            />     
        )
      }
    </>
  );
}
