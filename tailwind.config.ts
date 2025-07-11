import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Google Sans Text", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["Google Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Gemini-inspired theme colors
        "primary-glow": "hsl(var(--primary-glow))",
        "gravitational-wave": "hsl(var(--gravitational-wave))",
        "spacetime-distortion": "hsl(var(--spacetime-distortion))",
        "exotic-matter": "hsl(var(--exotic-matter))",
        "stability-good": "hsl(var(--stability-good))",
        "stability-warning": "hsl(var(--stability-warning))",
        "stability-critical": "hsl(var(--stability-critical))",
        "resonance-active": "hsl(var(--resonance-active))",
        "wormhole-throat": "hsl(var(--wormhole-throat))",
        
        // Gemini gradient colors
        "gemini-blue": "hsl(var(--gemini-blue))",
        "gemini-purple": "hsl(var(--gemini-purple))",
        "gemini-teal": "hsl(var(--gemini-teal))",
        "gemini-orange": "hsl(var(--gemini-orange))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gemini-pulse": {
          "0%, 100%": { 
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": { 
            opacity: "0.9",
            transform: "scale(1.01)",
          }
        },
        "gemini-gradient": {
          "0%": { 
            background: "linear-gradient(45deg, hsl(var(--gemini-blue)), hsl(var(--gemini-purple)))"
          },
          "25%": { 
            background: "linear-gradient(45deg, hsl(var(--gemini-purple)), hsl(var(--gemini-teal)))"
          },
          "50%": { 
            background: "linear-gradient(45deg, hsl(var(--gemini-teal)), hsl(var(--gemini-orange)))"
          },
          "75%": { 
            background: "linear-gradient(45deg, hsl(var(--gemini-orange)), hsl(var(--gemini-blue)))"
          },
          "100%": { 
            background: "linear-gradient(45deg, hsl(var(--gemini-blue)), hsl(var(--gemini-purple)))"
          }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gemini-pulse": "gemini-pulse 2s ease-in-out infinite",
        "gemini-gradient": "gemini-gradient 8s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gemini-gradient": "linear-gradient(135deg, hsl(var(--gemini-blue)), hsl(var(--gemini-purple)), hsl(var(--gemini-teal)))",
        "gemini-subtle": "linear-gradient(135deg, hsl(var(--background)), hsl(var(--muted)))",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;