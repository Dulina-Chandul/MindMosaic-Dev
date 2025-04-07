import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-[#214B59] mb-4">Access Denied</h1>
      <p className="text-lg text-gray-600 mb-8">
        You don't have permission to access this page.
      </p>
      <Button asChild className="bg-[#4ABABA] hover:bg-[#4ABABA]/90">
        <Link to="/">Return to Dashboard</Link>
      </Button>
    </div>
  );
};

export default Unauthorized;