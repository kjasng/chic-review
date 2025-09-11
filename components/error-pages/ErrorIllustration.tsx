"use client"

export function ErrorIllustration() {
  return (
    <div className="mb-8 flex justify-center">
      <svg
        className="h-64 w-64 md:h-80 md:w-80"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="200"
          cy="200"
          r="180"
          className="animate-pulse fill-golden/10"
        />

        {/* Main 404 Text */}
        <text
          x="200"
          y="180"
          className="animate-bounce fill-golden"
          fontSize="120"
          fontWeight="bold"
          textAnchor="middle"
        >
          404
        </text>

        {/* Book Stack */}
        <g transform="translate(140, 220)">
          {/* Book 1 */}
          <rect
            x="0"
            y="0"
            width="120"
            height="20"
            rx="2"
            className="fill-blue-500"
          />
          {/* Book 2 */}
          <rect
            x="5"
            y="22"
            width="110"
            height="20"
            rx="2"
            className="fill-green-500"
          />
          {/* Book 3 */}
          <rect
            x="10"
            y="44"
            width="100"
            height="20"
            rx="2"
            className="fill-purple-500"
          />
        </g>

        {/* Confused Student Character */}
        <g transform="translate(170, 100)">
          {/* Head */}
          <circle
            cx="30"
            cy="30"
            r="25"
            className="fill-foreground/10 stroke-foreground"
            strokeWidth="2"
          />

          {/* Question Marks */}
          <text
            x="60"
            y="20"
            className="fill-golden"
            fontSize="24"
            fontWeight="bold"
          >
            ?
          </text>
          <text
            x="0"
            y="25"
            className="fill-golden"
            fontSize="20"
            fontWeight="bold"
          >
            ?
          </text>
          <text
            x="55"
            y="50"
            className="fill-golden"
            fontSize="18"
            fontWeight="bold"
          >
            ?
          </text>

          {/* Eyes */}
          <circle cx="20" cy="28" r="2" className="fill-foreground" />
          <circle cx="40" cy="28" r="2" className="fill-foreground" />

          {/* Confused Mouth */}
          <path
            d="M 20 40 Q 30 35 40 40"
            className="stroke-foreground"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Floating Papers */}
        <g>
          <rect
            x="50"
            y="150"
            width="30"
            height="40"
            rx="2"
            className="fill-foreground/10 stroke-foreground/20"
            strokeWidth="1"
            transform="rotate(-15 65 170)"
          />
          <rect
            x="320"
            y="140"
            width="30"
            height="40"
            rx="2"
            className="fill-foreground/10 stroke-foreground/20"
            strokeWidth="1"
            transform="rotate(20 335 160)"
          />
          <rect
            x="300"
            y="250"
            width="25"
            height="35"
            rx="2"
            className="fill-foreground/10 stroke-foreground/20"
            strokeWidth="1"
            transform="rotate(-10 312 267)"
          />
        </g>

        {/* Magnifying Glass */}
        <g transform="translate(70, 250)">
          <circle
            cx="20"
            cy="20"
            r="18"
            className="fill-none stroke-foreground/30"
            strokeWidth="3"
          />
          <line
            x1="32"
            y1="32"
            x2="45"
            y2="45"
            className="stroke-foreground/30"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* CSS animations will be handled by Tailwind CSS classes */}
      </svg>
    </div>
  )
}
