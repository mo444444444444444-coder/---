const $=id=>document.getElementById(id);
const timelineData=[
["ما قبل الأسرات","تشكّل المجتمعات واستقرار وادي النيل وظهور ملامح الدولة المبكرة."],
["الدولة القديمة","عصر بناء الأهرامات وتطور العمارة الجنائزية الملكية."],
["الدولة الوسطى","ازدهار الإدارة والفنون والعمارة، ومن أشهر شواهدها مقابر بني حسن."],
["الدولة الحديثة","اتساع النفوذ المصري وازدهار طيبة ومعابدها والجبانات الملكية."],
["اليوناني والروماني","تداخل التقاليد المصرية مع الثقافة الهلنستية والرومانية وازدهار مدن مثل الإسكندرية."],
["العصر القبطي","تطور المجتمع المسيحي المصري وازدهار الأديرة والكنائس والفنون القبطية."],
["العصر الإسلامي","تتابعت الدول الإسلامية وازدهرت القاهرة بعمائر المساجد والمدارس والتحصينات."],
["العصر الحديث","ظهور المؤسسات المتحفية وحركة حماية التراث وتطور علم الآثار والسياحة الثقافية."]
];
function getFavs(){try{return JSON.parse(localStorage.getItem("egyptFavs")||"[]")}catch{return[]}}
function saveFavs(v){localStorage.setItem("egyptFavs",JSON.stringify(v));$("favCount").textContent=v.length}
function setEra(v){$("era").value=v;document.querySelector("#explore").scrollIntoView({behavior:"smooth"});render()}
function card(x){const fav=getFavs().includes(x.id);return '<article class="card" onclick="openArtifact('+x.id+')"><div class="card-img" style="background-image:url('+JSON.stringify(x.image)+')"><button class="card-fav" onclick="toggleFav(event,'+x.id+')">'+(fav?"♥":"♡")+'</button></div><div class="card-body"><span class="tag">'+x.era+" • "+x.type+'</span><h3>'+x.name+'</h3><div class="meta">📍 '+x.governorate+" • "+x.date+'</div><p>'+x.text+'</p><span class="read">فتح بطاقة الأثر ←</span></div></article>'}
function filtered(){const q=($("search").value||"").trim().toLowerCase(),era=$("era").value,type=$("type").value,g=$("governorate").value;return artifacts.filter(x=>(!q||(x.name+" "+x.ancientName+" "+x.text+" "+x.location+" "+x.governorate).toLowerCase().includes(q))&&(!era||x.era===era)&&(!type||x.type===type)&&(!g||x.governorate===g))}
function render(){const a=filtered();$("cards").innerHTML=a.length?a.map(card).join(""):'<div class="empty">لا توجد نتائج مطابقة. جرّب كلمة أخرى أو أزل أحد الفلاتر.</div>';$("resultCount").textContent=a.length;saveFavs(getFavs())}
function toggleFav(e,id){e.stopPropagation();const a=getFavs(),i=a.indexOf(id);i>-1?a.splice(i,1):a.push(id);saveFavs(a);render();toast(i>-1?"أُزيل من المحفوظات":"أُضيف إلى المحفوظات")}
function showFavorites(){const a=artifacts.filter(x=>getFavs().includes(x.id));$("search").value="";$("era").value="";$("type").value="";$("governorate").value="";$("cards").innerHTML=a.length?a.map(card).join(""):'<div class="empty">المحفوظات فارغة حتى الآن. اضغط ♡ على أي أثر لإضافته.</div>';$("resultCount").textContent=a.length;document.querySelector("#explore").scrollIntoView({behavior:"smooth"});toast("عرض المحفوظات")}
function openArtifact(id){const x=artifacts.find(a=>a.id===id);if(!x)return;const fav=getFavs().includes(id);$("modalContent").innerHTML='<div class="detail-hero" style="background-image:url('+JSON.stringify(x.image)+')"><span class="kicker">'+x.era+" • "+x.type+'</span><h2>'+x.name+'</h2><div>📍 '+x.location+'</div></div><div class="detail-body"><p class="detail-lead">'+x.text+'</p><div class="facts"><div class="fact"><small>الاسم القديم</small><b>'+x.ancientName+'</b></div><div class="fact"><small>الفترة</small><b>'+x.date+'</b></div><div class="fact"><small>المحافظة</small><b>'+x.governorate+'</b></div></div><h4>الوظيفة والاستخدام</h4><p>'+x.purpose+'</p><h4>العمارة</h4><p>'+x.architecture+'</p><div class="detail-links"><a href="'+x.source+'" target="_blank" rel="noopener">المصدر / المرجع ↗</a><button class="gold-btn" style="border:0;cursor:pointer;font-family:inherit" onclick="toggleFav(event,'+x.id+');openArtifact('+x.id+')">'+(fav?"إزالة من المحفوظات":"حفظ الأثر")+'</button></div></div>';$("modal").classList.add("open");document.body.style.overflow="hidden"}
function closeModal(){$("modal").classList.remove("open");document.body.style.overflow=""}
function toast(t){const e=$("toast");e.textContent=t;e.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>e.classList.remove("show"),1800)}
function renderTimeline(){$("timelineList").innerHTML=timelineData.map((x,i)=>'<div class="time-item"><span>محطة '+String(i+1).padStart(2,"0")+'</span><h3>'+x[0]+'</h3><p>'+x[1]+'</p></div>').join("")}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
saveFavs(getFavs());renderTimeline();render();