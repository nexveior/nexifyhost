import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', symbol: '$', flag: 'us', name: 'USD' },
  { code: 'INR', symbol: '₹', flag: 'in', name: 'INR' },
  { code: 'EUR', symbol: '€', flag: 'eu', name: 'EUR' },
  { code: 'GBP', symbol: '£', flag: 'gb', name: 'GBP' },
  { code: 'CAD', symbol: 'CA$', flag: 'ca', name: 'CAD' },
  { code: 'AUD', symbol: 'AU$', flag: 'au', name: 'AUD' },
  { code: 'JPY', symbol: '¥', flag: 'jp', name: 'JPY' },
  { code: 'BRL', symbol: 'R$', flag: 'br', name: 'BRL' },
  { code: 'BDT', symbol: '৳', flag: 'bd', name: 'BDT' },
  { code: 'PKR', symbol: '₨', flag: 'pk', name: 'PKR' },
  { code: 'IDR', symbol: 'Rp', flag: 'id', name: 'IDR' },
  { code: 'RUB', symbol: '₽', flag: 'ru', name: 'RUB' },
  { code: 'AED', symbol: 'AED', flag: 'ae', name: 'AED' },
  { code: 'SAR', symbol: 'SAR', flag: 'sa', name: 'SAR' }
];

export default function CurrencySelector({ currency, setCurrency }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeCurr = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          borderRadius: '8px',
          color: '#fff',
          padding: '0.4rem 0.65rem',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.825rem',
          fontWeight: 600,
          boxShadow: '0 0 10px rgba(0, 242, 254, 0.15)'
        }}
      >
        <img
          src={`https://flagcdn.com/w20/${activeCurr.flag}.png`}
          srcSet={`https://flagcdn.com/w40/${activeCurr.flag}.png 2x`}
          width="18"
          height="13"
          alt={activeCurr.name}
          style={{ borderRadius: '2px', objectFit: 'cover' }}
        />
        <span>{activeCurr.code} ({activeCurr.symbol})</span>
        <ChevronDown size={13} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            background: '#0b0f19',
            border: '1px solid rgba(0, 242, 254, 0.45)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.95), 0 0 20px rgba(0, 242, 254, 0.25)',
            borderRadius: '12px',
            padding: '6px',
            minWidth: '150px',
            maxHeight: '260px',
            overflowY: 'auto',
            zIndex: 9999999,
            display: 'flex',
            flexDirection: 'column',
            gap: '3px'
          }}
        >
          {CURRENCIES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                setCurrency(item.code);
                setOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 10px',
                background: item.code === currency ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
                border: 'none',
                color: item.code === currency ? 'var(--primary)' : 'var(--text-muted)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.825rem',
                fontWeight: item.code === currency ? 700 : 500,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (item.code !== currency) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (item.code !== currency) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }
              }}
            >
              <img
                src={`https://flagcdn.com/w20/${item.flag}.png`}
                srcSet={`https://flagcdn.com/w40/${item.flag}.png 2x`}
                width="18"
                height="13"
                alt={item.name}
                style={{ borderRadius: '2px', objectFit: 'cover' }}
              />
              <span>{item.code} ({item.symbol})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
