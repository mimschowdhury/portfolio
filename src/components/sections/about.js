import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  // max-width: 900px;
  background-color: var(--white);
  border-radius: 25px;
  padding: 100px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: #000000;

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
  p {
    color: #000000; /* Keeps paragraphs black in both light and dark modes */
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--white);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['JavaScript (ES6+)', 'Node.js', 'React.js', 'MySQL', 'Express', 'WordPress'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            {/* <p><em>Engineer turned coder </em>with a soft spot for coffee, clean code, and human-centered design 👩🏻‍💻.</p> */}
            <p>Hi! I'm Mimta and I enjoy creating fun, impactful projects/websites 👩🏻‍💻!</p>
            <p>
              I’m a Software Engineering alumnus from BrainStation with an unconventional edge — blending technical 
              skills with a background in biomedical engineering and enterprise risk management. 
              My unique career pivot reflects a commitment to continuous learning and 
              a drive to build meaningful, user-focused digital solutions.
            </p>
            <p>
              Fast-forward to today, and I’ve had the privilege of working at{' '}
              <a href="https://www.redcross.ca/">a non-profit organization</a>,{' '}
              <a href="https://www.td.com/ca/">a huge corporation</a>,{' '}
              <a href="https://www.pokimanphotos.com/">a local small business</a>, and{' '}
              <a href="https://www.vaughan.ca/">a 3D design studio</a>, building accessible, user-focused digital experiences across industries.
            </p>
            <p>
              I recently{' '}
              <strong>
                <a href="https://6ixcafes.netlify.app/">launched 6ixcafes</a>
              </strong>{' '}
              — a cafe discovery platform for Toronto coffee enthusiasts that blends my technical skills with my love for local gems.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
          <StaticImage
  className="img"
  src="../../images/me.jpg"
  width={500}
  quality={95}
  formats={['AUTO', 'WEBP']}
  alt="Headshot"
/>
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
