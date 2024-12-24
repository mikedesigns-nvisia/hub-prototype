import { Search, DragVertical, Minimize, Close } from '@carbon/icons-react';
import { useState } from 'react';

type Loan = {
  id: string;
  borrower: string;
  amount: number;
  status: string;
  date: string;
  loanType: string;
  rate: number;
  ltv: number;
  propertyType: string;
  propertyAddress: string;
};

const dummyLoans: Loan[] = [
  {
    id: '1',
    borrower: 'John Smith',
    amount: 350000,
    status: 'processing',
    date: '2024-03-20',
    loanType: 'Conventional',
    rate: 6.25,
    ltv: 80,
    propertyType: 'Single Family',
    propertyAddress: '123 Main St, Austin, TX'
  },
  {
    id: '2',
    borrower: 'Sarah Johnson',
    amount: 425000,
    status: 'underwriting',
    date: '2024-03-19',
    loanType: 'FHA',
    rate: 5.875,
    ltv: 96.5,
    propertyType: 'Condo',
    propertyAddress: '456 Park Ave, Miami, FL'
  },
  {
    id: '3',
    borrower: 'Michael Brown',
    amount: 550000,
    status: 'approved',
    date: '2024-03-18',
    loanType: 'Jumbo',
    rate: 7.125,
    ltv: 75,
    propertyType: 'Single Family',
    propertyAddress: '789 Oak Dr, Seattle, WA'
  },
  {
    id: '4',
    borrower: 'Emma Davis',
    amount: 625000,
    status: 'closing',
    date: '2024-03-17',
    loanType: 'VA',
    rate: 5.5,
    ltv: 100,
    propertyType: 'Townhouse',
    propertyAddress: '321 Pine Ln, Denver, CO'
  }
];

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    processing: 'bg-blue-600 text-white',
    underwriting: 'bg-purple-600 text-white',
    approved: 'bg-green-600 text-white',
    closing: 'bg-orange-600 text-white',
    funded: 'bg-teal-600 text-white'
  };
  return colors[status] || 'bg-gray-600 text-white';
};

const getLoanTypeColor = (loanType: string): string => {
  const colors: Record<string, string> = {
    Conventional: 'bg-blue-700 text-white',
    FHA: 'bg-green-700 text-white',
    VA: 'bg-purple-700 text-white',
    Jumbo: 'bg-yellow-600 text-white'
  };
  return colors[loanType] || 'bg-gray-600 text-white';
};

export const LoanPipelineWidget = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleMinimize = () => {
    window.electron?.minimize();
  };

  const handleClose = () => {
    window.electron?.close();
  };

  const filteredLoans = dummyLoans.filter(loan =>
    loan.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.loanType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Title Bar - full width needed for dragging */}
      <div className="titlebar bg-gray-800 border-b border-gray-700">
        <div className="titlebar-content mx-2">
          <div className="titlebar-left">
            <DragVertical className="titlebar-icon text-gray-300" />
            <span className="titlebar-text">Loan Pipeline</span>
          </div>
          <div className="titlebar-controls flex gap-2">
            <button onClick={handleMinimize} className="titlebar-button text-gray-300 hover:text-white">
              <Minimize size={20} />
            </button>
            <button onClick={handleClose} className="titlebar-button text-gray-300 hover:text-white">
              <Close size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - with consistent margins */}
      <div className="flex-1 flex flex-col p-2 space-y-2 overflow-hidden">
        {/* Search Bar */}
        <div className="bg-gray-800 p-2 rounded-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Search loans by borrower, status, address, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-md 
                       border border-gray-600 focus:outline-none focus:border-blue-500
                       placeholder-gray-400"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <colgroup>
                <col className="w-[2%]" />  {/* Status indicator */}
                <col className="w-[23%]" /> {/* Borrower */}
                <col className="w-[30%]" /> {/* Loan Info */}
                <col className="w-[30%]" /> {/* Property */}
                <col className="w-[15%]" /> {/* Details */}
              </colgroup>
              <thead className="bg-gray-800">
                <tr>
                  <th className="w-2 px-1"></th> {/* Status indicator column */}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-[200px]">
                    Borrower
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-[250px]">
                    Loan Info
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-[300px]">
                    Property
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-[130px]">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredLoans.map((loan) => (
                  <tr 
                    key={loan.id}
                    className="bg-gray-800 hover:bg-gray-700 transition-colors relative"
                  >
                    {/* Status indicator bar */}
                    <td className="w-2 p-0">
                      <div className={`w-1 h-full absolute left-0 top-0 ${getStatusColor(loan.status)}`} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm font-medium text-white">{loan.borrower}</div>
                          <div className="text-sm text-gray-300">ID: {loan.id}</div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(loan.status)}`}>
                          {loan.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-white">
                        ${loan.amount.toLocaleString()} / {loan.loanType}
                      </div>
                      <div className="text-xs text-gray-300 mt-1">
                        {loan.rate}% Rate
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-white">{loan.propertyType}</div>
                      <div className="text-xs text-gray-300">{loan.propertyAddress}</div>
                      <div className="text-xs text-gray-300 mt-1">LTV: {loan.ltv}%</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">
                      <div>Created: {new Date(loan.date).toLocaleDateString()}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
