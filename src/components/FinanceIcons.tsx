const FinanceIcons = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.04]">
    <svg className="absolute top-[10%] left-[5%] animate-float" width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none"/>
      <text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor">$</text>
    </svg>
    <svg className="absolute top-[30%] right-[8%] animate-float" style={{ animationDelay: "1s" }} width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="4 18 8 14 12 16 16 10 20 6" />
      <polyline points="16 6 20 6 20 10" />
    </svg>
    <svg className="absolute bottom-[20%] left-[12%] animate-float" style={{ animationDelay: "2s" }} width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
    <svg className="absolute bottom-[35%] right-[15%] animate-float" style={{ animationDelay: "0.5s" }} width="55" height="55" viewBox="0 0 24 24" fill="currentColor" opacity="0.5">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none"/>
      <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">₿</text>
    </svg>
    <svg className="absolute top-[60%] left-[45%] animate-float" style={{ animationDelay: "1.5s" }} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  </div>
);

export default FinanceIcons;
