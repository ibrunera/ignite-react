import Head from 'next/head'
import styles from './styles.module.scss'

export default function Posts(){
  return (
    <>
    <Head>
      <title>Posts | Ignews</title>
    </Head>

    <main className={styles.container}>
      <div className={styles.posts}>
        <a href="">
          <time>12 de marco de 2021</time>
          <strong>Titulo do post</strong>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis veniam culpa 
            consectetur quibusdam mollitia obcaecati saepe impedit modi aperiam itaque quia magni 
            deleniti rerum adipisci, officiis quisquam repudiandae dolore optio?
          </p>
        </a>

        <a href="">
          <time>12 de marco de 2021</time>
          <strong>Titulo do post</strong>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis veniam culpa 
            consectetur quibusdam mollitia obcaecati saepe impedit modi aperiam itaque quia magni 
            deleniti rerum adipisci, officiis quisquam repudiandae dolore optio?
          </p>
        </a>

        <a href="">
          <time>12 de marco de 2021</time>
          <strong>Titulo do post</strong>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis veniam culpa 
            consectetur quibusdam mollitia obcaecati saepe impedit modi aperiam itaque quia magni 
            deleniti rerum adipisci, officiis quisquam repudiandae dolore optio?
          </p>
        </a>
      </div>
    </main>
    </>
  )
}