const { WebSocketServer } = require('ws');

// Mock loan officer data with realistic scenarios
const mockLoans = [
  {
    id: '1',
    borrowerName: 'John & Sarah Smith',
    loanOfficer: 'Michael Johnson',
    loanAmount: 450000,
    status: 'processing',
    propertyType: 'Single Family',
    loanType: 'Conventional',
    rate: '6.25%',
    lastUpdated: '2024-03-15',
    address: '123 Oak Street, Portland, OR',
    ltv: '80%',
    dti: '36%',
    fico: 745
  },
  {
    id: '2',
    borrowerName: 'David Martinez',
    loanOfficer: 'Jennifer Williams',
    loanAmount: 325000,
    status: 'approved',
    propertyType: 'Condo',
    loanType: 'FHA',
    rate: '5.875%',
    lastUpdated: '2024-03-14',
    address: '456 Pine Ave, Seattle, WA',
    ltv: '85%',
    dti: '41%',
    fico: 680
  },
  {
    id: '3',
    borrowerName: 'Emily & James Wilson',
    loanOfficer: 'Michael Johnson',
    loanAmount: 675000,
    status: 'underwriting',
    propertyType: 'Single Family',
    loanType: 'Jumbo',
    rate: '6.5%',
    lastUpdated: '2024-03-15',
    address: '789 Maple Dr, San Francisco, CA',
    ltv: '75%',
    dti: '38%',
    fico: 760
  },
  {
    id: '4',
    borrowerName: 'Lisa Anderson',
    loanOfficer: 'Robert Chen',
    loanAmount: 280000,
    status: 'closing',
    propertyType: 'Townhouse',
    loanType: 'VA',
    rate: '5.75%',
    lastUpdated: '2024-03-13',
    address: '321 Elm Court, Austin, TX',
    ltv: '100%',
    dti: '43%',
    fico: 710
  },
  {
    id: '5',
    borrowerName: 'Thomas & Mary Brown',
    loanOfficer: 'Jennifer Williams',
    loanAmount: 550000,
    status: 'funded',
    propertyType: 'Single Family',
    loanType: 'Conventional',
    rate: '6.125%',
    lastUpdated: '2024-03-15',
    address: '567 Birch Lane, Denver, CO',
    ltv: '78%',
    dti: '35%',
    fico: 755
  },
  {
    id: '6',
    borrowerName: 'Michael Chang',
    loanOfficer: 'Robert Chen',
    loanAmount: 425000,
    status: 'processing',
    propertyType: 'Condo',
    loanType: 'Conventional',
    rate: '6.375%',
    lastUpdated: '2024-03-16',
    address: '890 Cedar St, Chicago, IL',
    ltv: '82%',
    dti: '39%',
    fico: 735
  },
  {
    id: '7',
    borrowerName: 'Rachel & Mark Thompson',
    loanOfficer: 'Michael Johnson',
    loanAmount: 890000,
    status: 'underwriting',
    propertyType: 'Single Family',
    loanType: 'Jumbo',
    rate: '6.625%',
    lastUpdated: '2024-03-16',
    address: '432 Redwood Ave, Los Angeles, CA',
    ltv: '70%',
    dti: '37%',
    fico: 785
  },
  {
    id: '8',
    borrowerName: 'Sofia Rodriguez',
    loanOfficer: 'Jennifer Williams',
    loanAmount: 295000,
    status: 'approved',
    propertyType: 'Townhouse',
    loanType: 'FHA',
    rate: '5.75%',
    lastUpdated: '2024-03-14',
    address: '765 Spruce Way, Miami, FL',
    ltv: '87%',
    dti: '42%',
    fico: 675
  },
  {
    id: '9',
    borrowerName: 'William & Emma Davis',
    loanOfficer: 'Robert Chen',
    loanAmount: 725000,
    status: 'closing',
    propertyType: 'Single Family',
    loanType: 'Conventional',
    rate: '6.25%',
    lastUpdated: '2024-03-15',
    address: '543 Willow Dr, Boston, MA',
    ltv: '76%',
    dti: '36%',
    fico: 750
  },
  {
    id: '10',
    borrowerName: 'Alexandra Kim',
    loanOfficer: 'Michael Johnson',
    loanAmount: 520000,
    status: 'processing',
    propertyType: 'Condo',
    loanType: 'Conventional',
    rate: '6.125%',
    lastUpdated: '2024-03-16',
    address: '234 Aspen Court, San Diego, CA',
    ltv: '80%',
    dti: '38%',
    fico: 740
  },
  {
    id: '11',
    borrowerName: 'Christopher & Julia White',
    loanOfficer: 'Jennifer Williams',
    loanAmount: 950000,
    status: 'underwriting',
    propertyType: 'Single Family',
    loanType: 'Jumbo',
    rate: '6.75%',
    lastUpdated: '2024-03-16',
    address: '876 Palm St, New York, NY',
    ltv: '72%',
    dti: '35%',
    fico: 790
  },
  {
    id: '12',
    borrowerName: 'Daniel Garcia',
    loanOfficer: 'Robert Chen',
    loanAmount: 375000,
    status: 'approved',
    propertyType: 'Townhouse',
    loanType: 'VA',
    rate: '5.875%',
    lastUpdated: '2024-03-15',
    address: '654 Oak Lane, Phoenix, AZ',
    ltv: '100%',
    dti: '41%',
    fico: 705
  },
  {
    id: '13',
    borrowerName: 'Robert & Amy Taylor',
    loanOfficer: 'Michael Johnson',
    loanAmount: 825000,
    status: 'processing',
    propertyType: 'Single Family',
    loanType: 'Jumbo',
    rate: '6.875%',
    lastUpdated: '2024-03-16',
    address: '789 Highland Ave, Seattle, WA',
    ltv: '75%',
    dti: '34%',
    fico: 780
  },
  {
    id: '14',
    borrowerName: 'Jennifer Lee',
    loanOfficer: 'Jennifer Williams',
    loanAmount: 425000,
    status: 'underwriting',
    propertyType: 'Condo',
    loanType: 'Conventional',
    rate: '6.375%',
    lastUpdated: '2024-03-15',
    address: '567 Market St, San Francisco, CA',
    ltv: '80%',
    dti: '38%',
    fico: 745
  },
  {
    id: '15',
    borrowerName: 'Carlos & Maria Sanchez',
    loanOfficer: 'Robert Chen',
    loanAmount: 315000,
    status: 'approved',
    propertyType: 'Townhouse',
    loanType: 'FHA',
    rate: '5.99%',
    lastUpdated: '2024-03-16',
    address: '432 Palm Dr, Miami, FL',
    ltv: '85%',
    dti: '43%',
    fico: 685
  },
  {
    id: '16',
    borrowerName: 'Andrew Mitchell',
    loanOfficer: 'Michael Johnson',
    loanAmount: 550000,
    status: 'processing',
    propertyType: 'Single Family',
    loanType: 'VA',
    rate: '5.75%',
    lastUpdated: '2024-03-16',
    address: '876 Liberty St, Austin, TX',
    ltv: '100%',
    dti: '41%',
    fico: 720
  },
  {
    id: '17',
    borrowerName: 'Sarah & James Cooper',
    loanOfficer: 'Jennifer Williams',
    loanAmount: 975000,
    status: 'underwriting',
    propertyType: 'Single Family',
    loanType: 'Jumbo',
    rate: '6.75%',
    lastUpdated: '2024-03-15',
    address: '234 Lake View Dr, Los Angeles, CA',
    ltv: '70%',
    dti: '36%',
    fico: 795
  },
  {
    id: '18',
    borrowerName: 'Michelle Wong',
    loanOfficer: 'Robert Chen',
    loanAmount: 485000,
    status: 'closing',
    propertyType: 'Condo',
    loanType: 'Conventional',
    rate: '6.25%',
    lastUpdated: '2024-03-16',
    address: '543 Pine St, Portland, OR',
    ltv: '78%',
    dti: '37%',
    fico: 755
  },
  {
    id: '19',
    borrowerName: 'Kevin & Lisa O\'Connor',
    loanOfficer: 'Michael Johnson',
    loanAmount: 625000,
    status: 'approved',
    propertyType: 'Single Family',
    loanType: 'Conventional',
    rate: '6.375%',
    lastUpdated: '2024-03-15',
    address: '789 Oak Lane, Denver, CO',
    ltv: '75%',
    dti: '35%',
    fico: 765
  },
  {
    id: '20',
    borrowerName: 'Patricia Hernandez',
    loanOfficer: 'Jennifer Williams',
    loanAmount: 295000,
    status: 'processing',
    propertyType: 'Townhouse',
    loanType: 'FHA',
    rate: '5.875%',
    lastUpdated: '2024-03-16',
    address: '321 Maple Ave, Phoenix, AZ',
    ltv: '90%',
    dti: '45%',
    fico: 665
  },
  {
    id: '21',
    borrowerName: 'Richard & Susan Baker',
    loanOfficer: 'Robert Chen',
    loanAmount: 1250000,
    status: 'underwriting',
    propertyType: 'Single Family',
    loanType: 'Jumbo',
    rate: '6.99%',
    lastUpdated: '2024-03-16',
    address: '456 Beach Rd, San Diego, CA',
    ltv: '65%',
    dti: '32%',
    fico: 810
  },
  {
    id: '22',
    borrowerName: 'David Kim',
    loanOfficer: 'Michael Johnson',
    loanAmount: 395000,
    status: 'closing',
    propertyType: 'Condo',
    loanType: 'Conventional',
    rate: '6.125%',
    lastUpdated: '2024-03-15',
    address: '654 Washington St, Boston, MA',
    ltv: '80%',
    dti: '39%',
    fico: 735
  },
  {
    id: '23',
    borrowerName: 'Elizabeth & John Murphy',
    loanOfficer: 'Jennifer Williams',
    loanAmount: 575000,
    status: 'approved',
    propertyType: 'Single Family',
    loanType: 'VA',
    rate: '5.75%',
    lastUpdated: '2024-03-16',
    address: '987 River Rd, Chicago, IL',
    ltv: '100%',
    dti: '42%',
    fico: 715
  },
  {
    id: '24',
    borrowerName: 'Michael & Rachel Foster',
    loanOfficer: 'Robert Chen',
    loanAmount: 725000,
    status: 'processing',
    propertyType: 'Single Family',
    loanType: 'Conventional',
    rate: '6.5%',
    lastUpdated: '2024-03-16',
    address: '345 Mountain View Dr, Las Vegas, NV',
    ltv: '78%',
    dti: '36%',
    fico: 750
  }
];

// Simulate status changes and updates
function updateLoanStatus(loan) {
  const statuses = ['processing', 'underwriting', 'approved', 'closing', 'funded'];
  const currentIndex = statuses.indexOf(loan.status);
  if (currentIndex < statuses.length - 1 && Math.random() > 0.7) {
    return statuses[currentIndex + 1];
  }
  return loan.status;
}

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send initial data
  ws.send(JSON.stringify(mockLoans));

  // Update data every 5 seconds
  const interval = setInterval(() => {
    const updatedLoans = mockLoans.map(loan => ({
      ...loan,
      status: updateLoanStatus(loan),
      lastUpdated: new Date().toISOString().split('T')[0],
      rate: (parseFloat(loan.rate) + (Math.random() * 0.125 - 0.0625)).toFixed(3) + '%'
    }));
    ws.send(JSON.stringify(updatedLoans));
  }, 5000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8080');