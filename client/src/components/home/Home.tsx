import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  UserGroupIcon,   ChartBarIcon, 
  BriefcaseIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export const Home: React.FC = () => {
  const steps = [
    {
      name: 'Register',
      description: 'Create your candidate profile with your personal and professional details',
      icon: UserGroupIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Upload Your CV',
      description: 'Upload your existing CV or fill in our comprehensive online form',
      icon: DocumentTextIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Complete Your Info',
      description: 'We\'ll guide you through any missing information needed for your application',
      icon: CheckCircleIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Get Updates',
      description: 'We tailor your CV for the right markets and keep you informed',
      icon: ChartBarIcon,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      name: 'Get Hired',
      description: 'You\'ll be contacted when shortlisted for opportunities',
      icon: BriefcaseIcon,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
    },
  ];

  const notices = [
    {
      icon: ExclamationTriangleIcon,
      title: 'Important Notice',
      message: 'Make sure your passport scan and qualifications are uploaded.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: ClockIcon,
      title: 'Reminder',
      message: 'Incomplete applications won\'t be considered — finish your profile!',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your First Step to{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  International Opportunities
                </span>
              </span>
              {' '}Starts Here
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Upload your CV, complete your profile, and let us help match you to the right roles abroad.
              Our platform streamlines your journey to international success.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 hover:scale-105"
              >
                Get Started <ArrowRightIcon className="inline-block h-4 w-4 ml-1" />
              </Link>
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors duration-200"
              >
                Login <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="relative w-[40rem] h-[30rem] rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2 shadow-2xl">
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-lg" />
                <div className="relative h-full rounded-lg bg-white p-8 shadow-lg">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <DocumentTextIcon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">CV Preview</h3>
                      <p className="text-sm text-gray-500">International Profile</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">How It Works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Journey to International Success
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Follow these simple steps to start your international career journey with us.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step.name} className="flex flex-col group relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200" />
                )}
                <dt className={`flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 ${step.color}`}>
                  <div className={`h-10 w-10 rounded-lg ${step.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  {step.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{step.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Important Notices Section */}
      <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {notices.map((notice) => (
              <div
                key={notice.title}
                className={`relative rounded-2xl ${notice.bgColor} p-6 shadow-sm ring-1 ring-gray-900/5`}
              >
                <div className="flex items-center gap-x-4">
                  <notice.icon className={`h-6 w-6 ${notice.color}`} />
                  <h3 className={`text-base font-semibold leading-7 ${notice.color}`}>
                    {notice.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-gray-600">{notice.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Danielle</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Need help? Reach out to our dedicated support team
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <div className="mt-10 flex items-center gap-x-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <EnvelopeIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">Email</h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">danielle@nwivisas.com</p>
                </div>
              </div>
              <div className="mt-10 flex items-center gap-x-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <PhoneIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">Phone</h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">+27 12 123 4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
        <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
          <div className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]" />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to start your international journey?
            <br />
            Get started today
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Join thousands of professionals who are already using our platform to find their dream opportunities abroad.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/register"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 hover:scale-105"
            >
              Get started
            </Link>
            <Link
              to="/contact"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors duration-200"
            >
              Contact us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
