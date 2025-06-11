import React from 'react'

// Modify the component to accept 'id' as a prop
const Faqs = ({ id }) => { 
  return (
    // Apply the received 'id' prop to the outermost section
    <section id={id} className="bg-black lg:py-20 py-10 px-6 mt-10 lg:mt-30"> {/* <-- Added 'id={id}' here */}
      {/* Heading & Subheading */}
      <h1 className="lg:ml-20 font-semibold text-lg xs:text-lg sm:text-lg md:text-lg lg:text-xl text-[#0c878c] leading-tight">
        COMMON QUESTIONS
        <p className="mr-40 w-full text-lg xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl lg:mt-4 mt-2 text-gray-300">Frequently asked questions</p>
      </h1>

      {/* Small Description Below the Texts */}
      <p className="lg:mt-4 mt-2 lg:ml-20 text-sm xs:text-sm sm:text-sm md:text-sm lg:text-base text-gray-400 lg:max-w-xl max-w-full">
        Get quick answers to all your questions and concerns about Estatify and Estatify homes. Whether as a member, host or just a visitor, we will have an answer waiting for you.
      </p>

      {/* Accordion Section (stretched right with equal margin) */}
      <div className="lg:mt-10 mt-5 lg:ml-20 lg:mr-20 space-y-4">
        {/* Question 1 */}
        <details className="border-b border-gray-700">
          <summary className="cursor-pointer flex justify-between items-center text-md xs:text-md sm:text-md md:text-base lg:text-lg font-medium hover:text-[#0c878c] lg:pb-6 pb-3">
            How does Estatify work?
            <span className="text-[#0c878c] text-md xs:text-base sm:text-lg md:text-xl lg:text-2xl">⌄</span>
          </summary>
          <p className="lg:mt-2 mt-1 text-sm xs:text-sm sm:text-sm md:text-sm lg:text-sm text-gray-400">
            At Estatify, we offer access to premium residential solutions with options of monthly, quarterly, and biannual subscription. Once you find a space you like, simply create a booking along with a few details about yourself. This request is then processed within a few hours.
          </p>
          <p className="lg:mt-2 mt-1 text-sm xs:text-sm sm:text-sm md:text-sm lg:text-sm text-gray-400">
              No payment is taken until the booking is accepted. We will charge you the rent upfront plus a one-off booking fee and security deposit. You will then receive a confirmation email with the details of your new space.
            </p>
        </details>

        {/* Question 2 */}
        <details className="border-b border-gray-700">
          <summary className="cursor-pointer flex justify-between items-center text-md xs:text-md sm:text-md md:text-base lg:text-lg font-medium hover:text-[#0c878c] lg:pb-6 pb-3">
            Does Estatify organize viewings?
            <span className="text-[#0c878c] text-md xs:text-base sm:text-lg md:text-xl lg:text-2xl">⌄</span>
          </summary>
          <p className="lg:mt-2 mt-1 text-sm xs:text-sm sm:text-sm md:text-sm lg:text-sm text-gray-400">
            Yes, we do.
          </p>
        </details>

        {/* Question 3 */}
        <details className="border-b border-gray-700">
          <summary className="cursor-pointer flex justify-between items-center text-md xs:text-md sm:text-md md:text-base lg:text-lg font-medium hover:text-[#0c878c] lg:pb-6 pb-3">
            Does Estatify own the spaces listed?
            <span className="text-[#0c878c] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl">⌄</span>
          </summary>
          <p className="lg:mt-2 mt-1 text-sm xs:text-sm sm:text-sm md:text-xs lg:text-sm text-gray-400">
            No Estatify does not own the spaces listed, as we have homeowners that list these spaces on our platform.
          </p>
        </details>
      </div>
    </section>
  )
}

export default Faqs;