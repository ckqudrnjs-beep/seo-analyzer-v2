document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('seoTitle');
    const descInput = document.getElementById('metaDescription');
    
    // 길이 실시간 업데이트 함수
    function updateLength(inputElement, lengthElement, maxLength) {
        const length = inputElement.value.length;
        lengthElement.textContent = `현재 길이: ${length}자 (권장 ${maxLength}자 내외)`;
        lengthElement.style.color = length > maxLength ? '#e74c3c' : '#1abc9c';
    }

    // 제목 길이 추적
    titleInput.addEventListener('input', () => {
        updateLength(titleInput, document.getElementById('titleLength'), 50);
    });

    // 설명 길이 추적
    descInput.addEventListener('input', () => {
        updateLength(descInput, document.getElementById('descriptionLength'), 160);
    });

    // 초기 길이 표시
    updateLength(titleInput, document.getElementById('titleLength'), 50);
    updateLength(descInput, document.getElementById('descriptionLength'), 160);

    // 분석 버튼 이벤트
    document.getElementById('analyzeBtn').addEventListener('click', analyzeContent);
});


function analyzeContent() {
    const keyword = document.getElementById('targetKeyword').value.trim().toLowerCase();
    const title = document.getElementById('seoTitle').value.trim();
    const description = document.getElementById('metaDescription').value.trim();
    
    let titleStatus = '';
    let descStatus = '';

    // 1. 제목 분석 (길이 및 키워드)
    const titleLength = title.length;
    let titleCompliant = true;

    if (titleLength < 10) {
        titleStatus += '❌ 제목이 너무 짧습니다. (최소 10자 권장) ';
        titleCompliant = false;
    } else if (titleLength > 55) {
        titleStatus += '❌ 제목이 너무 깁니다. 검색 결과에서 잘릴 수 있습니다. (50자 이내 권장) ';
        titleCompliant = false;
    }
    
    if (keyword && title.toLowerCase().includes(keyword)) {
        titleStatus += '✅ 타겟 키워드가 제목에 포함되었습니다. ';
    } else if (keyword) {
        titleStatus += '⚠️ 타겟 키워드가 제목에 없습니다. SEO에 불리할 수 있습니다. ';
        titleCompliant = false;
    }

    // 2. 설명 분석 (길이 및 키워드)
    const descLength = description.length;
    let descCompliant = true;

    if (descLength < 50) {
        descStatus += '❌ 설명이 너무 짧습니다. (최소 50자 권장) ';
        descCompliant = false;
    } else if (descLength > 165) {
        descStatus += '❌ 설명이 너무 깁니다. 검색 결과에서 잘릴 수 있습니다. (160자 이내 권장) ';
        descCompliant = false;
    }
    
    if (keyword && description.toLowerCase().includes(keyword)) {
        descStatus += '✅ 타겟 키워드가 설명에 포함되었습니다. ';
    } else if (keyword) {
        descStatus += '⚠️ 타겟 키워드가 설명에 없습니다. 클릭률(CTR)에 불리할 수 있습니다. ';
        descCompliant = false;
    }

    // 3. 최종 결과 출력
    document.getElementById('titleResult').innerHTML = titleCompliant 
        ? `<span class="status-compliant">${titleStatus || '제목 최적화 상태 양호'}</span>` 
        : `<span class="status-violation">${titleStatus}</span>`;

    document.getElementById('descResult').innerHTML = descCompliant 
        ? `<span class="status-compliant">${descStatus || '설명 최적화 상태 양호'}</span>` 
        : `<span class="status-violation">${descStatus}</span>`;
}
