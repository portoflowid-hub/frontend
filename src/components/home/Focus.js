"use client";

import Image from 'next/image';
import Link from 'next/link'; 
import styles from '../../styles/home/Focus.module.css';
import { BsArrowRight } from 'react-icons/bs';

const focusAreas = [
  {
    title: 'Career Roadmap',
    imageUrl: '/images/5.png',
    link: '/career' 
  },
  {
    title: 'Academy',
    imageUrl: '/images/6.png',
    link: '/academic' 
  },
  {
    title: 'Portofolio',
    imageUrl: '/images/7.png',
    link: '/portfolio'
  }
];

const Focus = () => {
  return (
    <section className={styles.focusSection}>
      <h2 className={styles.headline}>Main Focus of PortoFlow</h2>
      <div className={styles.cardsContainer}>
        {focusAreas.map((item) => (
          <div key={item.title} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image src={item.imageUrl} alt={item.title} width={180} height={180} />
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            
            <Link href={item.link} className={styles.detailButton}>
              <BsArrowRight /> See Detail
            </Link>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Focus;
