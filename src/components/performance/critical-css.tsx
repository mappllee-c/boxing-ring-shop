export function CriticalCSS() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          /* Critical CSS for above-the-fold content */
          .font-inter { font-family: Inter, system-ui, -apple-system, sans-serif; }
          .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
          
          /* Layout structure */
          .min-h-screen { min-height: 100vh; }
          .bg-gray-50 { background-color: #f9fafb; }
          .bg-white { background-color: #ffffff; }
          .bg-blue-600 { background-color: #2563eb; }
          .text-white { color: #ffffff; }
          
          /* Container */
          .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
          @media (min-width: 768px) { .container { padding: 0 2rem; } }
          
          /* Header critical styles */
          .sticky { position: sticky; }
          .top-0 { top: 0; }
          .z-50 { z-index: 50; }
          .border-b { border-bottom-width: 1px; }
          .border-gray-200 { border-color: #e5e7eb; }
          
          /* Text styles */
          .text-2xl { font-size: 1.5rem; line-height: 2rem; }
          .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
          .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
          .font-bold { font-weight: 700; }
          .text-gray-900 { color: #111827; }
          .text-gray-700 { color: #374151; }
          .text-blue-600 { color: #2563eb; }
          
          /* Flexbox */
          .flex { display: flex; }
          .items-center { align-items: center; }
          .justify-between { justify-content: space-between; }
          .space-x-8 > * + * { margin-left: 2rem; }
          .space-x-4 > * + * { margin-left: 1rem; }
          
          /* Padding/Margin */
          .px-4 { padding-left: 1rem; padding-right: 1rem; }
          .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
          .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
          .h-16 { height: 4rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .mb-8 { margin-bottom: 2rem; }
          
          /* Hero section critical */
          .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
          .from-blue-900 { --tw-gradient-from: #1e3a8a; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(30, 58, 138, 0)); }
          .to-blue-800 { --tw-gradient-to: #1e40af; }
          
          /* Hide mobile menu on desktop */
          @media (min-width: 768px) {
            .md\\:flex { display: flex; }
            .hidden { display: none; }
          }
          
          /* Button critical styles */
          .rounded-lg { border-radius: 0.5rem; }
          .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
          .transition { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
          
          /* Hover states */
          .hover\\:text-blue-600:hover { color: #2563eb; }
          .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
          
          /* Loading state */
          .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
          }
          
          /* Image optimization */
          .object-cover { object-fit: cover; }
          .transition-opacity { transition-property: opacity; }
          .duration-300 { transition-duration: 300ms; }
          .opacity-0 { opacity: 0; }
          .opacity-100 { opacity: 1; }
        `
      }}
    />
  )
}

export function PreloadCriticalResources() {
  return (
    <>
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Prefetch critical pages */}
      <link rel="prefetch" href="/products" />
      <link rel="prefetch" href="/contact" />
      <link rel="prefetch" href="/subsidy" />
    </>
  )
}