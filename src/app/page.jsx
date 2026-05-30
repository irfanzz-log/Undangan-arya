'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';
import Tamu from '@/component/tamu';
import Countdown from '@/component/countdown';

export default function WeddingInvitation() {
  const audioRef = useRef(null);

  function playAudio() {
    if (!audioRef.current) {
      audioRef.current = new window.Audio('/music/music.mp3');
      audioRef.current.loop = true;
    }

    audioRef.current.play();
  }

  useEffect(() => {

    async function getComments() {

      const { data, error } = await supabase
        .from('comments')
        .select('*');

      if (!error) {
        setUcapan(data);
      }
    }

    getComments();

  }, []);

  const [ucapan, setUcapan] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [form, setForm] = useState({
    name: "",
    message: "",
    status: ""
  });

  function formUpdate(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const [isWarning, setIsWarning] = useState();

  async function handleFormButton(e) {
    e.preventDefault();

    setIsWarning(false);

    if (!form.name || !form.message || !form.status) {
      return setIsWarning(true);
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([form])
      .select();

    if (!error) {

      setUcapan((prev) => [...prev, data[0]]);

      setForm({
        name: "",
        message: "",
        status: ""
      });
    }
  }

  function scrollToSection(id) {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main className={`relative text-white h-screen w-full overflow-x-hidden ${isOpen ? 'overflow-y-scroll' : 'overflow-y-hidden'}`}>
      <div className='fixed z-100 w-full mx-10 bottom-0 -left-10 p-5 flex md:hidden'>
        <div className={`w-full flex justify-around items-center p-5 bg-[#ae8f7a] rounded-full ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-20'} transition-all duration-500 ease-out`}>
          <div onClick={() => scrollToSection('hero')}><img src="https://indoinvite.com/nikah/home.svg" alt="" className='w-5'/></div>
          <div onClick={() => scrollToSection('partner')}><img src="https://indoinvite.com/nikah/people.svg" alt="" className='w-5'/></div>
          <div onClick={() => scrollToSection('location')}><img src="https://indoinvite.com/nikah/map.svg" alt="" className='w-5'/></div>
          <div onClick={() => scrollToSection('gallery')}><img src="https://indoinvite.com/nikah/picture.svg" alt="" className='w-5'/></div>
        </div>
      </div>
      <div className="fixed -z-1 inset-0 bg-[url('https://indoinvite.com/nikah/template/pandora/pandora-classic/PC-BG.webp')] bg-cover bg-no-repeat opacity-100 h-screen w-full" />

      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className={` transform-gpu relative h-screen items-center justify-center text-center px-6 transition-all duration-1000 ease-out ${isOpen ? 'hidden opacity-0' : 'opacity-100 flex'}`}>
        <div className="absolute inset-0 bg-[url('/g2.jpeg')] bg-cover bg-center brightness-50" />

        <div className="relative w-full z-10 flex-col items-center justify-center">

          <p className="tracking-[0.4em] uppercase text-sm mb-4 text-neutral-300">
            Wedding Invitation
          </p>

          <h1 className="text-6xl md:text-8xl font-serif mb-6 text-[#FFFBF1]">
            Arya <span className="">&</span> Riska
          </h1>

          <p className="text-lg text-neutral-200 mb-8">
            Saturday, 06 Juni 2026
          </p>

          <p className='text-serif text-sm  text-neutral-200 text-xs md:text-lg'>Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <Suspense fallback={<div className='font-great-vibes font-bold text-[#ae8f7a] md:text-5xl text-4xl my-3'>Loading...</div>}>
            <Tamu />
          </Suspense>
          <div className='w-full flex justify-center items-center'>
            <button
              type='button'
              onClick={() => { setIsOpen(!isOpen); playAudio(); }}
              className='hover:scale-110 my-2 flex items-center p-2 rounded-lg bg-[#ae8f7a] text-white font-serif'><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-open" viewBox="0 0 16 16">
                <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882zM15 7.383l-4.778 2.867L15 13.117zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765z" />
              </svg></span><span className='mx-2'>Buka Undangan</span></button>
          </div>
        </div>

      </motion.section>

      <div id='hero' className=''>
        {/* HERO */}
        <div
          className={`relative h-screen flex items-center justify-center text-center px-6 transition-all duration-1000 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-[url('/hero.jpeg')] bg-cover bg-center brightness-50" />

          <div className="relative z-10">

            <p className="tracking-[0.4em] uppercase text-sm mb-4 text-neutral-300">
              Wedding Invitation
            </p>

            <h1 className="text-6xl md:text-8xl font-serif mb-6 text-[#FFFBF1]">
              Arya <span className="">&</span> Riska
            </h1>

            <p className="text-lg text-neutral-200 mb-8">
              Saturday, 06 Juni 2026
            </p>

            <p className='text-serif text-sm  text-neutral-200'>Tanpa Mengurangi Rasa Hormat,
              Kami Mengundang Bapak/Ibu/Saudara/i
              Untuk Hadir Di Acara Pernikahan Kami.</p>
          </div>
        </div>

        {/* QUOTE */}
        <div className='relative overflow-hidden'>
          <div className='w-full flex justify-between'>
            <img src="https://indoinvite.com/nikah/template/pandora/pandora-classic/PC-AKR.webp" alt="" className='w-40 animate-zoom [animation-delay:0s]' />
            <img src="https://indoinvite.com/nikah/template/pandora/pandora-classic/PC-AKR.webp" alt="" className='w-40 -scale-x-100 animate-zoom [animation-delay:0.3s]' />
          </div>

          <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className=" transform-gpu px-6 text-center"
            id='partner'>
            <div className="max-w-3xl mx-auto">
              <p className='text-black text-2xl font-bold mb-5'>السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ</p>
              <p className="text-md md:text-xl leading-relaxed font-serif text-[#ae8f7a]">
                Atas Berkah dan Rahmat Allah Subhanallahu Wa Ta'ala. Tanpa mengurangi rasa hormat. Kami mengundang Bapak/Ibu/Saudara/i serta kerabat sekalian untuk menghadiri acara pernikahan kami :”
              </p>
            </div>
          </motion.section>
        </div>

        {/* COUPLE */}
        <motion.section
          id="detail"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="transform-gpu pb-26 px-6 "
        >
          <div className='relative w-full flex flex-col items-center justify-center my-10'>
            <div className='text-center'>
              <h2 className='text-[#505050] text-xl font-serif my-3'>Pasangan</h2>
              <p className='font-great-vibes font-bold text-[#ae8f7a] text-4xl'>Pengantin</p>
            </div>
            <div className='my-5 w-full md:flex justify-center'>
              <p className='text-[#505050] font-serif text-xs text-center md:text-xl md:w-1/3'>Maha Suci Allah SWT, Yang telah menciptakan makhlukNya berpasang-pasangan.
                Ya Allah, perkenankanlah dan Ridhoilah Pernikahan kami.</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            {/* Groom */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="transform-gpu text-center">
              <div className="relative w-56 h-56 mx-auto mb-8">
                <img
                  src="/arya.jpeg"
                  alt="Groom"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className='w-70 -left-8 z-2 top-0  absolute'>
                  <img src="https://indoinvite.com/nikah/template/pandora/pandora-classic/PC-Bor.webp" alt="" className='w-full h-full' />
                </div>
              </div>

              <h2 className="text-4xl font-great-vibes font-bold text-[#ae8f7a] mb-3">Arya Wira Radja S.Kom</h2>
              <div className='w-full flex justify-center'>
                <div className='w-3/4 p-[0.2px] rounded-xl my-2 bg-black'>
                </div>
              </div>
              <p className='text-[#505050] font-serif'>Anak Ketiga dari Pasangan</p>
              <p className="text-[#505050] font-serif">
                Bapak Racmat Fauzi (alm) & Ibu Dra.Windiarti
              </p>
              <p className='text-[#505050] font-serif pt-2 text-xs md:text-lg'>
                Beralamat di Perum Royalindo,Desa.Tanjung Agung, Kelurahan.Katibung, Lampung Selatan
              </p>
            </motion.div>

            {/* Bride */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="transform-gpu text-center">
              <div className="relative w-56 h-56 mx-auto mb-8">
                <img
                  src="/riska.jpeg"
                  alt="Bride"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className='w-70 -left-8 z-2 top-0  absolute'>
                  <img src="https://indoinvite.com/nikah/template/pandora/pandora-classic/PC-Bor.webp" alt="" className='w-full h-full' />
                </div>
              </div>

              <h2 className="text-4xl font-great-vibes font-bold text-[#ae8f7a] mb-3">Riska Mailani</h2>
              <div className='w-full flex justify-center'>
                <div className='w-3/4 p-[0.2px] rounded-xl my-2 bg-black'>
                </div>
              </div>
              <p className='text-[#505050] font-serif'>Anak Ketiga dari Pasangan</p>
              <p className="text-[#505050] font-serif">
                Bapak Riswanto & Ibu Rusmana
              </p>
              <p className='text-[#505050] font-serif pt-2 text-xs md:text-lg'>
                Beralamat di Jl.Balik,Lk 2,Tanjung Gading, Kelurahan Garuntang, Bandar Lampung
              </p>
            </motion.div>
          </div>
        </motion.section>

        <Countdown targetDate={'2026-06-06T11:00:00'} />

        {/* EVENT */}
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-28 px-6 bg-neutral-950">
          <div className="max-w-5xl mx-auto text-center">
            <div className='w-full mb-10'>
              <h2 className="font-serif text-xl my-2 text-neutral-100">Waktu & Tempat</h2>
              <p className='font-great-vibes font-bold text-[#ae8f7a] text-4xl'>Pernikahan</p>
              <p className='font-serif text-neutral-100 md:text-lg text-sm'>Pertemuan adalah permulaan, tetap bersama adalah perkembangan, bekerja sama adalah keberhasilan.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="bg-black rounded-3xl p-10 border border-[#ae8f7a]">
                <div className='w-full flex justify-center my-3'>
                  <img src="/dovewhite.png" alt="" className='w-1/2' />
                </div>
                <h3 className="text-3xl mb-6 text-[#ae8f7a] font-great-vibes font-bold">
                  Akad Nikah
                </h3>

                <p className="text-neutral-200 font-serif leading-8">
                  Saturday
                  <br /> <span className='text-5xl font-bold text-[#ae8f7a]'>06</span>
                  <br /> <span className='text-[#ae8f7a]'>Juni 2026</span>
                  <br />
                  08.00 WIB - s/d selesai
                  <br />
                  Jl.Balik,Lk 2,Tanjung Gading, Kelurahan Garuntang, Bandar Lampung
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="bg-black rounded-3xl p-10 border border-[#ae8f7a] ">
                <div className='w-full flex justify-center my-3'>
                  <img src="/bouquetwhite.png" alt="" className='w-1/3' />
                </div>
                <h3 className="text-3xl mb-6 text-[#ae8f7a] font-great-vibes font-bold">
                  Reception
                </h3>

                <p className="text-neutral-200 font-serif leading-8">
                  Saturday
                  <br /> <span className='text-5xl font-bold text-[#ae8f7a]'>06</span>
                  <br /> <span className='text-[#ae8f7a]'>Juni 2026</span>
                  <br />
                  08.00 WIB s/d Selesai
                  <br />
                  Jl.Balik,Lk 2,Tanjung Gading, Kelurahan Garuntang, Bandar Lampung
                </p>
              </motion.div>
            </div>

            <div id='location' className='w-full my-10'>
              <div className='w-full mb-10'>
                <h2 className="font-serif text-xl my-2 text-neutral-100">Lokasi</h2>
                <p className='font-serif font-bold text-[#ae8f7a] text-4xl my-3'>Jl.Balik,Lk 2,Tanjung Gading</p>
                <p className='font-serif text-neutral-100 text-sm'>Kelurahan Garuntang, Bandar Lampung</p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className='w-full'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3966.618508811874!2d106.45981207499001!3d-6.181785993805685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTAnNTQuNCJTIDEwNsKwMjcnNDQuNiJF!5e0!3m2!1sid!2sid!4v1778683668162!5m2!1sid!2sid"
                  className='w-full h-100'
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* GALLERY */}
        <div className='relative'>
          <div className='absolute z-20 left-0 bottom-0 w-full flex justify-between'>
            <img src="https://indoinvite.com/nikah/template/pandora/pandora-classic/PC-AKR.webp" alt="" className='w-40 animate-zoom -scale-y-100 [animation-delay:0s]' />
            <img src="https://indoinvite.com/nikah/template/pandora/pandora-classic/PC-AKR.webp" alt="" className='w-40 -scale-x-100 -scale-y-100 animate-zoom [animation-delay:0.3s]' />
          </div>
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="py-28 px-2"
            id='gallery'>
            <div className="max-w-6xl mx-auto">
              <div className='w-full mb-20 text-center'>
                <h2 className="font-serif text-xl my-2 text-[#505050]">Moment</h2>
                <p className='font-great-vibes font-bold text-[#ae8f7a] text-4xl'>Bahagia Kami</p>
                <p className='font-serif text-[#505050] md:text-lg text-sm mt-5'>Pertemuan adalah permulaan, tetap bersama adalah perkembangan, bekerja sama adalah keberhasilan.</p>
              </div>

              <div className="grid md:grid-cols-3 grid-cols-2 gap-1">
                {['hero.jpeg', 'g1.jpeg', 'g2.jpeg', 'g3.jpeg', 'g4.jpeg', 'g5.jpeg'].map((img) => (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    key={img}
                    className="overflow-hidden w-full rounded-lg"
                  >
                    <img
                      src={`/${img}`}
                      alt="Gallery"
                      className="w-full h-full object-cover hover:scale-110 transition duration-700"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        {/* Gift */}
        <section
          className="relative py-28 px-6 bg-center bg-cover text-center">
          <div className='absolute w-full h-full bg-black/70 z-10 top-0 left-0 inset-0'></div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative z-20 max-w-5xl mx-auto">
            <div className='relative z-20 mb-10'>
            <p className='font-great-vibes font-bold text-[#ae8f7a] font-bold text-5xl'>Amplop Digital</p>
            <p className='font-serif text-neutral-100 md:text-lg text-sm mt-5'>Doa restu Anda merupakan hadiah terindah bagi kami. Namun apabila memberi adalah bentuk kasih, Anda dapat mengirimkan tanda kasih melalui amplop digital berikut.</p>
          </div>

          <div className="relative z-20">
            <div className='w-full md:flex-row flex-col'>
              <div className='relative my-5 text-[#505050] bg-white p-5 rounded-xl'>
                <div className='w-full flex justify-center my-2'>
                  <img src="/mandiri.png" alt="" className='md:w-1/6 w-3/4' />
                </div>
                <p className='text-lg'>1140026390594</p>
                <p className='text-sm'>A/N Arya wira radja</p>
              </div>

              <div className='relative my-5 text-[#505050] bg-white p-5 rounded-xl'>
                <div className='w-full flex justify-center my-2'>
                  <img src="/bca.svg" alt="" className='md:w-1/6 w-3/4' />
                </div>
                <p className='text-lg'>0231309763 </p>
                <p className='text-sm'>A/N Riska mailani</p>
              </div>
            </div>
          </div>
          </motion.div>
        </section>

        {/* RSVP */}
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-28 px-6 bg-neutral-950">
          <div className="max-w-3xl mx-auto text-center">
            <div className='relative z-20 mb-10'>
              <h2 className="font-serif text-xl my-2 text-neutral-100">Doa & Ucapan</h2>
              <p className='font-great-vibes font-bold text-[#ae8f7a] text-4xl'>Untuk Kami Berdua</p>
              <p className='font-serif text-neutral-100 md:text-lg text-sm'>Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.</p>
            </div>

            <div className="relative flex justify-center">
              <form onSubmit={handleFormButton} className='flex w-full flex-col font-serif text-[#505050]'>
                <input name='name' type="text" placeholder='Nama' className='w-full bg-white p-2 rounded-md my-1' value={form?.name} onChange={formUpdate} />
                <textarea name="message" id="" placeholder='Beri ucapan' className='text- w-full bg-white p-2 rounded-md my-1 resize-none' value={form?.message} onChange={formUpdate}></textarea>
                <div className='relative w-full my-1'>
                  <div name="status" className='p-2 bg-white rounded-md p-2 hover:bg-gray-100 cursor-pointer' value={form?.status} onClick={(() => setIsActive(!isActive))}>{form.status || 'Status Kehadiran'}</div>
                  <div className={`z-2 shadow-md absolute flex-col bg-white w-full -bottom-22 rounded-md left-0 ${isActive ? 'flex' : 'hidden'}`}>
                    <button type='button' className='w-full p-2 hover:bg-gray-100 cursor-pointer' onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        status: 'Hadir',
                      }));

                      setIsActive(false);
                    }}>Hadir</button>
                    <button type='button' className='w-full p-2 hover:bg-gray-100 cursor-pointer' onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        status: 'Tidak Hadir',
                      }));

                      setIsActive(false);
                    }}>Tidak Hadir</button>
                  </div>
                </div>
                {isWarning && <p className='text-red-700'>Harap Lengkapi form!</p>}
                <button className='hover:scale-110 transition-all duration-400 ease-out w-1/2 bg-[#ae8f7a] text-white p-2 rounded-md my-1'>Kirim Ucapan</button>
              </form>
            </div>

            <div className='relative w-full my-1'>
              <div className='w-full flex flex-col bg-white rounded-md overflow-hidden'>
                <div className='text-left font-serif p-1 w-full bg-[#ae8f7a]'>
                  <p className='flex items-center'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                  </svg><span className='mx-2'>Coments</span></p>
                </div>
                {ucapan.map((data, idx) => {
                  const name = data.name.slice(0, 1);
                  return (
                    <div key={idx} className='w-full flex text-left text-black p-2 my-2'>
                      <div className='w-1/5 md:w-1/8'>
                        <div className='w-15 h-15 flex items-center justify-center border-[0.5px] border-[#ae8f7a] rounded-full overflow-hidden'>
                          <p>{name}</p>
                        </div>
                      </div>
                      <div className='w-full p-2'>
                        <div className='w-full flex items-center'>
                          <p className='font-bold'>{data.name}</p>
                          <p className='mx-3 p-1 px-2 text-xs text-white bg-[#ae8f7a] rounded-lg'>{data.status}</p>
                        </div>
                        <div>
                          <p className='text-sm'>{data.message}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className="py-10 text-center bg-black border-t border-neutral-900">
          <p className="text-neutral-500">
            © 2026 Solusi Digital Kreatif
          </p>
        </footer>
      </div>
    </main>
  );
}