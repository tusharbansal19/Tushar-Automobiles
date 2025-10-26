export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f3f4f6'
    }}>
      <div style={{ 
        maxWidth: '500px', 
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          404 - Page Not Found
        </h1>
        <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
          The page you are looking for does not exist.
        </p>
        <a 
          href="/" 
          style={{ 
            display: 'inline-block',
            backgroundColor: '#dc2626', 
            color: 'white', 
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            textDecoration: 'none'
          }}
        >
          Go Home
        </a>
      </div>
    </div>
  );
}