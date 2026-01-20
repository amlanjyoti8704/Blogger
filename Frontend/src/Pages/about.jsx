import React from 'react';

function About() {
  return (
    <div className="bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* Content */}
          <div className="md:w-7/12 lg:w-6/12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-pink-700 via-yellow-600 to-red-500 bg-clip-text text-transparent">
                Something about Project
              </span>
            </h2>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum omnis
              voluptatem accusantium nemo perspiciatis delectus atque autem.
              Voluptatum tenetur beatae unde aperiam, repellat expedita
              consequatur! Officiis id consequatur atque doloremque!
            </p>

            <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Nobis minus voluptatibus pariatur dignissimos libero quaerat iure
              expedita at? Asperiores nemo possimus nesciunt dicta veniam
              aspernatur quam mollitia.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;