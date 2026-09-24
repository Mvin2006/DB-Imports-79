'use client';

import {useEffect,useState} from 'react';
import {ArrowUpRight,ArrowRight,Plus,Pause,Play,Menu,X,Shirt,SlidersHorizontal,RotateCcw} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription,DialogClose} from '@/components/ui/dialog';
import {Sheet,SheetContent,SheetTitle,SheetDescription} from '@/components/ui/sheet';
import {categories,fallbackProducts,money,type Product} from '@/lib/catalog-data';

const instagram='https://www.instagram.com/db_imports79/';
function Instagram({size=20}:{size?:number}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>;}
const slides=[{eyebrow:'DB IMPORTS / MENSWEAR',line1:'SEU ESTILO.',line2:'SUA PRESENÇA.',description:'Peças que falam por você. Do essencial ao extraordinário.',label:'ESSENTIAL COLLECTION',filter:'Todas'},
 {eyebrow:'ATITUDE EM CADA DETALHE',line1:'NADA BÁSICO.',line2:'SÓ ESSENCIAL.',description:'Modelagens amplas. Tons marcantes. A sua nova assinatura.',label:'URBAN ESSENTIALS',filter:'Camisetas'},
 {eyebrow:'A SUA PRÓXIMA VERSÃO',line1:'VISTA A SUA',line2:'IDENTIDADE.',description:'Uma seleção de moda masculina para ocupar o seu espaço.',label:'THE GOLD EDIT',filter:'Jaquetas'}];

function ProductImage({product,className=''}:{product:Product;className?:string}){
 const tiled=product.tile!==undefined;return <div className={'product-photo '+(tiled?'tiled ':'')+className}>
 <img src={product.image} alt={product.name} loading="lazy" decoding="async" style={tiled?{width:'200%',height:'200%',left:product.tile!%2?-100+'%':0,top:product.tile!>1?-100+'%':0}:undefined}/></div>;
}
function Logo(){return <span className="brand-mark" role="img" aria-label="Logo DB Imports"/>;}

export default function Catalog(){
 const [products,setProducts]=useState<Product[]>(fallbackProducts);
 const [category,setCategory]=useState('Todas');const [selected,setSelected]=useState<Product|null>(null);
 const [color,setColor]=useState('');const [size,setSize]=useState('');const [slide,setSlide]=useState(0);const [paused,setPaused]=useState(false);
 const [menu,setMenu]=useState(false);
 const [loading,setLoading]=useState(false);const [loadError,setLoadError]=useState('');
 const visible=products.filter(p=>p.published&&(category==='Todas'||p.category===category));
 const published=products.filter(p=>p.published);const active=slides[slide];
 const openProduct=(p:Product)=>{setSelected(p);setColor(p.colors[0]?.name||'');setSize(p.sizes[0]||'');};
 const goCatalog=(filter='Todas')=>{setCategory(filter);setMenu(false);document.getElementById('catalogo')?.scrollIntoView({behavior:'smooth'});};
 async function refresh(){try{const response=await fetch('catalog.json',{cache:'no-store'});if(!response.ok)return;const data=await response.json() as {products?:Product[]};if(Array.isArray(data.products)&&data.products.length){setProducts(data.products);}}catch{/* Fallback silencioso */}}
 useEffect(()=>{void refresh();},[]);
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');setPaused(media.matches);const changed=()=>setPaused(media.matches);media.addEventListener('change',changed);return()=>media.removeEventListener('change',changed);},[]);
 useEffect(()=>{if(paused||selected)return;const timer=setInterval(()=>setSlide(s=>(s+1)%slides.length),6500);return()=>clearInterval(timer);},[paused,selected]);

 return <div className={paused?'site motion-paused':'site'}>
 <a className="skip-link" href="#catalogo">Ir para o catálogo</a>
 <div className="announcement"><span>ESTILO. QUALIDADE. PRESENÇA.</span><span className="announcement-right">MODA MASCULINA <span className="mini-star">✦</span> DB IMPORTS</span></div>
 <header className="header"><a className="brand" href="#inicio" aria-label="DB Imports — início"><Logo/><span className="brand-word">DB <b>IMPORTS</b><small>MEN'S COLLECTION</small></span></a>
 <nav className="desktop-nav" aria-label="Navegação principal"><a className="nav-active" href="#inicio">Início</a><a href="#catalogo" onClick={()=>setCategory('Todas')}>Catálogo</a><a href="#identidade">Nossa essência</a></nav>
 <div className="header-actions"><a className="instagram-nav" href={instagram} target="_blank" rel="noreferrer"><Instagram size={17}/><span>@db_imports79</span><ArrowUpRight size={14}/></a><button className="icon-button mobile-menu" onClick={()=>setMenu(true)} aria-label="Abrir menu"><Menu/></button></div></header>

 <main>
 <section className={'hero slide-'+slide} id="inicio" aria-label="Coleção DB Imports">
 <img className="hero-image" src="assets/hero.png" alt="Modelo vestindo camiseta preta e sobrecamisa bronze da coleção demonstrativa DB Imports" fetchPriority="high"/>
 <div className="hero-shade"/><div className="hero-grid"/><div className="hero-orbit" aria-hidden="true"/><div className="hero-light"/>
 <div className="hero-content" key={slide}><div className="eyebrow"><span className="gold-line"/>{active.eyebrow}</div><h1>{active.line1}<br/><span>{active.line2}</span></h1><p>{active.description}</p><button className="gold-button" onClick={()=>goCatalog(active.filter)}>Explorar catálogo <ArrowUpRight size={20}/></button><div className="hero-caption"><span>MODA MASCULINA</span><span>IDENTIDADE SEM LIMITES</span></div></div>
 <div className="hero-side-note" aria-hidden="true">DB / ESTILO EM MOVIMENTO</div>
 <div className="hero-bottom"><div className="slide-controls"><span className="slide-current">0{slide+1}</span><div className="slide-dots">{slides.map((s,i)=><button key={i} className={slide===i?'active':''} onClick={()=>setSlide(i)} aria-label={'Ver banner '+(i+1)} aria-pressed={slide===i}/>)}</div><span className="slide-total">/ 03</span><button className="icon-button motion-toggle" onClick={()=>setPaused(!paused)} aria-label={paused?'Reproduzir animação':'Pausar animação'}>{paused?<Play size={14}/>:<Pause size={14}/>}</button></div><div className="hero-edition"><span className="edition-line"/>{active.label}<span className="gold-star">✦</span></div></div>
 </section>
 <div className="ticker" aria-hidden="true"><div>{Array.from({length:4},(_,i)=><span key={i}>ESTILO <i>✦</i> QUALIDADE <i>✦</i> PRESENÇA <i>✦</i> DB IMPORTS <i>✦</i></span>)}</div></div>

 <section id="catalogo" className="catalog-section section-wrap"><div className="section-heading"><div><div className="eyebrow muted-gold">A SUA PRÓXIMA ESCOLHA</div><h2>Vista sua <em>identidade.</em></h2></div><span className="collection-note">CURADORIA DB IMPORTS<br/><b>Do básico ao marcante.</b></span></div>
 <div className="catalog-toolbar"><div className="category-list" aria-label="Categorias de roupa">{['Todas',...categories].map(c=><button key={c} className={category===c?'category active':'category'} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c==='Todas'&&<SlidersHorizontal size={15}/>}<span>{c}</span>{c==='Todas'&&<span className="category-count">{published.length}</span>}</button>)}</div><span className="results-count" aria-live="polite">{visible.length} peças</span></div>
 {loadError&&<div className="load-error" role="alert"><span>Não foi possível atualizar o catálogo. Exibindo a coleção demonstrativa.</span><button onClick={refresh}><RotateCcw size={15}/>Tentar novamente</button></div>}
 <div className="product-grid" aria-busy={loading}>{visible.map((p,i)=><article className="product-card" key={p.id} style={{animationDelay:(i%4)*65+'ms'}}><button className="product-open" onClick={()=>openProduct(p)} aria-label={'Ver detalhes de '+p.name}><div className="card-image-wrap"><ProductImage product={p}/>{p.tag&&<span className={'product-tag '+(p.tag==='DESTAQUE'?'gold-tag':'')}>{p.tag}</span>}<span className="view-product"><ArrowUpRight size={21}/></span><span className="image-caption">VER DETALHES <Plus size={13}/></span></div><div className="product-info"><div className="product-meta">{p.category}<span>{p.sizes.join(' · ')}</span></div><h3>{p.name}</h3><div className="card-bottom"><strong>{money(p.price)}</strong><div className="swatches" aria-label={'Cores: '+p.colors.map(c=>c.name).join(', ')}>{p.colors.slice(0,5).map(c=><span key={c.name} title={c.name} style={{background:c.hex}}/>)}</div></div></div></button></article>)}</div>
 {!visible.length&&<div className="empty-state"><Shirt size={36}/><h3>Nenhuma peça nesta categoria.</h3><button className="outline-button" onClick={()=>setCategory('Todas')}>Ver todas as peças <ArrowRight size={16}/></button></div>}
 <div className="catalog-footnote"><span>SEU ESTILO COMEÇA AQUI.</span><p>{products.some(p=>p.demo)?'Coleção demonstrativa · Imagens, cores, tamanhos e valores ilustrativos.':'Consulte os detalhes de cada peça.'}</p></div>
 </section>

 <section id="identidade" className="brand-story section-wrap"><div className="story-copy"><div className="eyebrow muted-gold"><span className="gold-line"/>MUITO ALÉM DE VESTIR</div><h2>ESTILO É<br/>DEIXAR SUA<br/><span>MARCA.</span></h2><p>Uma escolha. Uma atitude. O seu jeito de chegar.<br/>Na DB Imports, o seu estilo começa aqui.</p><a href={instagram} className="outline-button" target="_blank" rel="noreferrer"><Instagram size={18}/>Conheça nosso Instagram<ArrowUpRight size={18}/></a><div className="story-signature"><Logo/><div><strong>DB IMPORTS</strong><span>Estilo • Qualidade • Presença</span></div></div></div><div className="story-photos"><div className="original-post post-one"><img src="assets/instagram-original.png" loading="lazy" alt="Peças coloridas da DB Imports na publicação original da loja"/></div><div className="original-post post-two"><img src="assets/instagram-original.png" loading="lazy" alt="Camisetas vermelha, preta e branca na publicação original da DB Imports"/></div><span className="photo-stamp">DIRETO DA<br/><b>DB IMPORTS.</b><ArrowUpRight size={26}/></span></div></section>
 </main>
 <footer><div className="footer-main"><a className="brand" href="#inicio"><Logo/><span className="brand-word">DB <b>IMPORTS</b><small>ESTILO. QUALIDADE. PRESENÇA.</small></span></a><a href={instagram} target="_blank" rel="noreferrer">@db_imports79 <Instagram size={18}/><ArrowUpRight size={14}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} DB Imports</span><span>CATÁLOGO DE MODA MASCULINA</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>

 <Dialog open={!!selected} onOpenChange={open=>!open&&setSelected(null)}><DialogContent className="product-dialog" showCloseButton={false}>{selected&&<><DialogClose className="modal-close icon-button" aria-label="Fechar detalhes"><X size={20}/></DialogClose><ProductImage product={selected} className="detail-image"/><div className="detail-content"><div className="eyebrow muted-gold">{selected.category}</div><DialogTitle>{selected.name}</DialogTitle><strong className="detail-price">{money(selected.price)}</strong><DialogDescription>{selected.description}</DialogDescription><div className="choice-group"><div className="choice-label">Cor <span>{color}</span></div><div className="detail-colors">{selected.colors.map(c=><button key={c.name} onClick={()=>setColor(c.name)} aria-pressed={color===c.name} aria-label={c.name} className={color===c.name?'selected':''}><span style={{background:c.hex}}/>{c.name}</button>)}</div></div><div className="choice-group"><div className="choice-label">Tamanho <span>{size}</span></div><div className="size-options">{selected.sizes.map(s=><button key={s} onClick={()=>setSize(s)} aria-pressed={size===s} className={s===size?'selected':''}>{s}</button>)}</div></div><a className="gold-button" href={instagram} target="_blank" rel="noreferrer"><Instagram size={18}/>Falar com a DB Imports<ArrowUpRight size={18}/></a>{selected.demo&&<p className="demo-note">Peça demonstrativa. Imagem e opções ilustrativas.</p>}</div></>}</DialogContent></Dialog>

 <Sheet open={menu} onOpenChange={setMenu}><SheetContent className="menu-sheet"><SheetTitle>DB IMPORTS</SheetTitle><SheetDescription>Seu estilo começa aqui.</SheetDescription><a href="#inicio" onClick={()=>setMenu(false)}>Início</a><button onClick={()=>goCatalog()}>Catálogo</button><a href="#identidade" onClick={()=>setMenu(false)}>Nossa essência</a><a href={instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={18}/></a></SheetContent></Sheet>
 </div>;
}