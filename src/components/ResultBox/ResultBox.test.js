import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  const testPLNtoUSD = [
    { amount: '100.00', amountAfterConvert: '28.57' },
    { amount: '58.00', amountAfterConvert: '16.57' },
    { amount: '225.00', amountAfterConvert: '64.29' },
    { amount: '300.00', amountAfterConvert: '85.71' },
    { amount: '777.00', amountAfterConvert: '222.00' },
  ];

  const testUSDtoPLN = [
    { amount: '150.00', amountAfterConvert: '525.00' },
    { amount: '235.00', amountAfterConvert: '822.50' },
    { amount: '555.00', amountAfterConvert: '1,942.50' },
    { amount: '48.00', amountAfterConvert: '168.00' },
    { amount: '15.00', amountAfterConvert: '52.50' },
  ];

  const testSameCurrency = [
    { amount: '177.00' },
    { amount: '235.00' },
    { amount: '555.00' },
    { amount: '48.00' },
    { amount: '15.00' },
  ];

  const testMinusAmount = [
    { amount: '-1.00', from: 'PLN', to: 'USD' },
    { amount: '-25.00', from: 'USD', to: 'PLN' },
    { amount: '-755.00', from: 'PLN', to: 'PLN' },
    { amount: '-48.00', from: 'USD', to: 'USD' },
    { amount: '-99.00', from: 'PLN', to: 'USD' },
    { amount: '-7.00', from: 'USD', to: 'PLN' },
    { amount: '-88.00', from: 'PLN', to: 'PLN' },
    { amount: '-5.00', from: 'USD', to: 'USD' },
  ];

  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    for (const testObj of testPLNtoUSD) {
      render(
        <ResultBox from='PLN' to='USD' amount={parseInt(testObj.amount)} />
      );
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(
        `PLN ${testObj.amount} = $${testObj.amountAfterConvert}`
      );
      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    for (const testObj of testUSDtoPLN) {
      render(
        <ResultBox from='USD' to='PLN' amount={parseInt(testObj.amount)} />
      );
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(
        `$${testObj.amount} = PLN ${testObj.amountAfterConvert}`
      );
      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> USD', () => {
    for (const testObj of testSameCurrency) {
      render(
        <ResultBox from='USD' to='USD' amount={parseInt(testObj.amount)} />
      );
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(
        `$${testObj.amount} = $${testObj.amount}`
      );
      cleanup();
    }
  });

  it('should render proper info about conversion when PLN -> PLN', () => {
    for (const testObj of testSameCurrency) {
      render(
        <ResultBox from='PLN' to='PLN' amount={parseInt(testObj.amount)} />
      );
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(
        `PLN ${testObj.amount} = PLN ${testObj.amount}`
      );
      cleanup();
    }
  });

  it('should render "Wrong value..." when amount < 0', () => {
    for (const testObj of testMinusAmount) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={parseInt(testObj.amount)}
        />
      );
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value...');
      cleanup();
    }
  });
});
