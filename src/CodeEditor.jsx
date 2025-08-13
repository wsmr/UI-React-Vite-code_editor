import React, {useState, useRef, useEffect} from 'react';

const CodeEditor = () => {
    const [code, setCode] = useState(`{
  "latitude": 526,
  "name": "mgr6vttnpzk",
  "longitude": 713,
  "hasAccess": true,
  "field5": {
    "name": "eilp5tel",
    "latitude": 787,
    "isVerified": true,
    "hasAccess": false,
    "description": "4co77brdefy"
  },
  "field6": {
    "hasAccess": false,
    "field2": [
      false,
      155,
      "71jru",
      358
    ],
    "zipcode": 483,
    "field4": [
      771,
      true
    ],
    "zipcode_4": 917
  }
}`);

    const textareaRef = useRef(null);
    const [lineNumbers, setLineNumbers] = useState([]);
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState('');

    // Update line numbers when code changes
    useEffect(() => {
        const lines = code.split('\n');
        setLineNumbers(lines.map((_, index) => index + 1));

        // Validate JSON
        try {
            JSON.parse(code);
            setIsValid(true);
            setError('');
        } catch (e) {
            setIsValid(false);
            setError(e.message);
        }
    }, [code]);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleKeyDown = (e) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const {selectionStart, selectionEnd} = textarea;

        // Handle tab indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            const newCode = code.substring(0, selectionStart) + '  ' + code.substring(selectionEnd);
            setCode(newCode);

            // Set cursor position after tab
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = selectionStart + 2;
                textarea.focus();
            }, 0);
        }

        // Auto-close brackets
        if (e.key === '{') {
            e.preventDefault();
            const newCode = code.substring(0, selectionStart) + '{}' + code.substring(selectionEnd);
            setCode(newCode);
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
                textarea.focus();
            }, 0);
        }

        if (e.key === '[') {
            e.preventDefault();
            const newCode = code.substring(0, selectionStart) + '[]' + code.substring(selectionEnd);
            setCode(newCode);
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
                textarea.focus();
            }, 0);
        }

        if (e.key === '"' && code[selectionStart - 1] !== '\\') {
            e.preventDefault();
            const newCode = code.substring(0, selectionStart) + '""' + code.substring(selectionEnd);
            setCode(newCode);
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
                textarea.focus();
            }, 0);
        }
    };

    const handleScroll = (e) => {
        const lineNumbersEl = document.getElementById('line-numbers');
        if (lineNumbersEl) {
            lineNumbersEl.scrollTop = e.target.scrollTop;
        }
    };

    return (
        <div className="w-full max-w-[95vw] mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-300 text-sm font-medium">JSON Editor</div>
            </div>

            {/* Editor Container */}
            <div className="flex bg-gray-900 relative">
                {/* Line Numbers */}
                <div
                    id="line-numbers"
                    className="bg-gray-800 text-gray-500 text-sm select-none border-r border-gray-700 overflow-hidden"
                    style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        fontSize: '14px',
                        lineHeight: '20px',
                        padding: '16px 12px 16px 16px',
                        width: '60px'
                    }}
                >
                    {lineNumbers.map((num) => (
                        <div key={num} className="text-right" style={{height: '20px'}}>
                            {num}
                        </div>
                    ))}
                </div>

                {/* Simple Textarea Editor */}
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDown}
                    onScroll={handleScroll}
                    className="flex-1 bg-gray-900 text-gray-100 outline-none border-none resize-none overflow-auto"
                    style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        fontSize: '14px',
                        lineHeight: '20px',
                        padding: '16px',
                        // height: '500px',
                        minHeight: '300px',
                        tabSize: 2,
                        whiteSpace: 'pre',
                        wordWrap: 'off'
                    }}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder="Enter your JSON code here..."
                />
            </div>

            {/* Status Bar */}
            <div className="bg-gray-800 px-4 py-2 border-t border-gray-700 flex items-center justify-between">
                <div className={`flex items-center space-x-2 ${isValid ? 'text-green-400' : 'text-red-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${isValid ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span className="text-sm font-medium">
            {isValid ? 'Valid JSON' : 'Invalid JSON'}
          </span>
                    {!isValid && error && (
                        <span className="text-red-400 text-xs ml-2">
              {error}
            </span>
                    )}
                </div>

                <div className="text-gray-400 text-xs">
                    Lines: {lineNumbers.length} | Characters: {code.length}
                </div>
            </div>

            {/* Formatting Controls */}
            <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
                <div className="flex space-x-2">
                    <button
                        onClick={() => {
                            try {
                                const parsed = JSON.parse(code);
                                setCode(JSON.stringify(parsed, null, 2));
                            } catch (e) {
                                // Invalid JSON, keep as is
                            }
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                    >
                        Format JSON
                    </button>

                    <button
                        onClick={() => {
                            try {
                                const parsed = JSON.parse(code);
                                setCode(JSON.stringify(parsed));
                            } catch (e) {
                                // Invalid JSON, keep as is
                            }
                        }}
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                    >
                        Minify
                    </button>

                    <button
                        onClick={() => {
                            setCode(`{
  "latitude": 526,
  "name": "example",
  "longitude": 713,
  "hasAccess": true,
  "data": {
    "name": "sample",
    "isVerified": true,
    "hasAccess": false
  }
}`);
                        }}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
                    >
                        Reset to Object
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
