                                                    //tabs
const tabsContent = document.querySelectorAll('.tabcontent');     
const tabsParent  = document.querySelector('.tabheader__items');
const tabs        = document.querySelectorAll('.tabheader__item');    


function hideTabContent()
{
    tabsContent.forEach((item)=>{
        item.classList.add('hide');
        item.classList.remove('show');
    });

    function removeActiveClassInTab()
    {
        tabs.forEach(item => item.classList.remove('tabheader__item_active'))
    }
    removeActiveClassInTab();
}



function showTabContent(index = 0)
{
    tabsContent[index].classList.add('show');
    tabsContent[index].classList.remove('hide');

    function addActiveClassInTab()
    {
        tabs[index].classList.add('tabheader__item_active');
    }

    addActiveClassInTab();

}

hideTabContent();
showTabContent();


tabsParent.addEventListener('click',(event)=>{
    tabs.forEach((value,key)=>{
        if(event.target == value )
        {
            hideTabContent();
            showTabContent(key);
        }
    });
});


                                                        //timer
const deadLine = '2023-4-23';

