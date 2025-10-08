import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calculator, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import TransparentCard from '../UI/TransparentCard';

const MortgageCalculator: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [loanAmount, setLoanAmount] = useState(8000000);
  const [downPayment, setDownPayment] = useState(2000000);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTerm, setLoanTerm] = useState(20);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, downPayment, interestRate, loanTerm]);

  const calculateMortgage = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      const payment = principal / numberOfPayments;
      setMonthlyPayment(payment);
      setTotalPayment(payment * numberOfPayments);
      setTotalInterest(0);
    } else {
      const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                     (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      const total = payment * numberOfPayments;
      
      setMonthlyPayment(payment);
      setTotalPayment(total);
      setTotalInterest(total - principal);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-amber-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full mb-4">
            <Calculator className="w-4 h-4 text-amber-600 mr-2" />
            <span className="text-amber-700 font-medium">Financial Planning</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mortgage Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan your home purchase with our advanced mortgage calculator and get instant estimates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TransparentCard className="p-8 bg-white/90 backdrop-blur-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Mortgage</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Price
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="8,000,000"
                    />
                  </div>
                  <input
                    type="range"
                    min="1000000"
                    max="50000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="2,000,000"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={loanAmount * 0.5}
                    step="50000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <div className="relative">
                      <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term (Years)
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="20"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TransparentCard>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <TransparentCard className="p-8 bg-gradient-to-br from-green-600 to-green-700 text-white">
              <h3 className="text-2xl font-bold mb-6">Monthly Payment</h3>
              <div className="text-4xl font-bold mb-2">
                {formatCurrency(monthlyPayment)}
              </div>
              <p className="text-green-100">Principal & Interest</p>
            </TransparentCard>

            <div className="grid grid-cols-2 gap-4">
              <TransparentCard className="p-6 bg-white/90 backdrop-blur-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Total Payment</h4>
                <div className="text-2xl font-bold text-amber-600">
                  {formatCurrency(totalPayment)}
                </div>
              </TransparentCard>

              <TransparentCard className="p-6 bg-white/90 backdrop-blur-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Total Interest</h4>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalInterest)}
                </div>
              </TransparentCard>
            </div>

            <TransparentCard className="p-6 bg-white/90 backdrop-blur-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Loan Breakdown</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-semibold">{formatCurrency(loanAmount - downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Down Payment:</span>
                  <span className="font-semibold">{formatCurrency(downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Down Payment %:</span>
                  <span className="font-semibold">{((downPayment / loanAmount) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </TransparentCard>

            <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg">
              Get Pre-Approved
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;